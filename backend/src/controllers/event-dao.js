/**
 * This file contains all the functions that are used in event-API.js
 * including getAllEvents, getEventById, createEvent, updateEvent, deleteEvent,
 * getAllEventsByUserId, getSearchedEvents, getEventsByTags, getEventsNearby
 */

import Attend from '../models/Attend-schema.js';
import Event from '../models/Event-schema.js';
import Like from '../models/Like-schema.js';

const PageItem = 10;

// get all events that have not ended or will start within 24 hours, listed by likes
export const getAllEvents = async (pages) => {
    try {
        const currentTime = new Date();
        const twentyFourHoursFromNow = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
        const events = await Event.find({
            $or: [
                { endTime: { $gte: currentTime } },
                { startTime: { $gte: twentyFourHoursFromNow } }
            ]
        });
        // Count likes for each event
        const eventsWithLikes = await Promise.all(events.map(async (event) => {
            const likeCount = await Like.countDocuments({ eventId: event._id });
            return { ...event.toObject(), likeCount };
        }));
        // Sort events by like count in descending order
        const sortedEvents = eventsWithLikes.sort((a, b) => b.likeCount - a.likeCount);
        const pagesEvent = sortedEvents.slice((pages * PageItem), (pages * PageItem + PageItem))
        return pagesEvent;
    } catch (error) {
        throw new Error(`Error while fetching all events: ${error.message}`);
    }
};

// get searched events by given keywords and pages
export const getSearchedEvents = async (title, description, page) => {
    try {
        const query = {};
        // Add title and description to the query if provided
        if (title || description) {
            query.$or = [];
            if (title) {
                query.$or.push({ title: { $regex: title, $options: 'i' } });
            }
            if (description) {
                query.$or.push({ description: { $regex: description, $options: 'i' } });
            }
        }
        // Find events matching the query
        let events = await Event.find(query);
        // Retrieve the count of likes for each event
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const likeCount = await Like.countDocuments({ eventId: event._id });
            event.likeCount = likeCount;
        }
        // Sort events by like count in descending order
        events = events.sort((a, b) => b.likeCount - a.likeCount);
        // Calculate the start and end index based on the page number
        const perPage = 10;
        const startIndex = page * perPage;
        const endIndex = startIndex + perPage;
        // Return events for the specified page
        return events.slice(startIndex, endIndex);
    } catch (error) {
        throw new Error(`Error while fetching searched events: ${error.message}`);
    }
};

//get all current or incoming events that are within a walking distance
export const getEventsNearby = async (lat, lng, distance) => {
    try {
        const currentTime = new Date();
        const twentyFourHoursFromNow = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
        const events = await Event.find({
            $and: [
                {
                    "address.location.coordinates": {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [lng, lat]
                            },
                            $maxDistance: distance * 1000
                        }
                    }
                },
                {
                    $or: [
                        { endTime: { $gte: currentTime } },
                        { startTime: { $gte: twentyFourHoursFromNow } }
                    ]
                }
            ]
        });
        return events;
    } catch (error) {
        throw new Error(`Error while fetching nearby events: ${error.message}`);
    }
}

//get all events that match the user's preference
export const getEventsByTags = async (tags, pages) => {
    try {
        const events = await Event.find({ tags: { $in: tags } }).sort({ startTime: 1 }).skip(pages * PageItem).limit(PageItem);
        return events;
    } catch (error) {
        throw new Error(`Error while fetching searched events: ${error.message}`);
    }
};

// get all events by user Id
export const getAllEventsByUserId = async (userId) => {
    try {
        const events = await Event.find({ userId: userId });
        return events;
    } catch (error) {
        throw new Error(`Error while fetching all events by userId: ${error.message}`);
    }
};

// get an event by id
export const getEventById = async (eventId) => {
    try {
        const event = await Event.findById(eventId);
        return event;
    } catch (error) {
        throw new Error(`Error while fetching event by ID: ${error.message}`);
    }
};

// Create an event
export const createEvent = async (eventData) => {
    try {
        const event = new Event(eventData);
        await event.save();
        return event;
    } catch (error) {
        throw new Error(`Error while creating a new event: ${error.message}`);
    }
};

// Update an event
export const updateEvent = async (userId, eventId, eventData) => {
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return null;
        }
        if (event.userId.toString() === userId) {
            const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });
            return updatedEvent;
        } else {
            return "unAuthorized";
        }
    } catch (error) {
        throw new Error(`Error while updating an event: ${error.message}`);
    }
};

// Delete an event
export const deleteEvent = async (userId, eventId) => {
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return null;
        }
        if (event.userId.toString() === userId) {
            const deletedEvent = await Event.findByIdAndDelete(eventId);
            // For deleting likes associated with the event
            const deletedEventLikes = await Like.deleteMany({ eventId: eventId });
            // For deleting attendance records associated with the event
            const deletedEventAttends = await Attend.deleteMany({ eventId: eventId });
            return { deletedEvent, deletedEventLikes, deletedEventAttends };
        } else {
            return "unAuthorized";
        }
    } catch (error) {
        console.error("Error while deleting an event:", error); // Log any errors that occur
        throw new Error(`Error while deleting an event: ${error.message}`);
    }
};