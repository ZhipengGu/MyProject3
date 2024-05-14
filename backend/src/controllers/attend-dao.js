/**
 * This file contains all the functions that are used in attend-API.js
 * including createAttend, deleteAttend, getUsersAttendingEvent, getEventsAttendByThisUser
 */

import Attend from "../models/Attend-schema.js";
import Event from "../models/Event-schema.js";
import User from '../models/Users-schema.js';
import mongoose from 'mongoose';

// Create an attendance record
export const createAttend = async (eventId, userId) => {
  try {
    // Check if the user is already attending the event
    const existingAttend = await Attend.findOne({ eventId, userId });
    if (existingAttend) {
      throw new Error('User is already attending this event');
    }
    // If the user is not attending the event, create a new attendance record
    const attend = new Attend({ eventId, userId });
    await attend.save();
    return attend;
  } catch (error) {
    throw new Error(`Error while creating new attendance record: ${error.message}`);
  }
};

// Delete an attendance record
export const deleteAttend = async (eventId, userId) => {
  try {
    // Check if the user is attending the event
    const existingAttend = await Attend.findOne({ eventId, userId });
    if (!existingAttend) {
      throw new Error('User is not attending this event');
    }
    // If the user is attending the event, delete the attendance record
    const deletedAttend = await Attend.findByIdAndDelete(existingAttend._id);
    if (!deletedAttend) {
      throw new Error('Failed to delete attendance record');
    }
    return deletedAttend;
  } catch (error) {
    throw new Error(`Error while deleting attendance record: ${error.message}`);
  }
};

// Get users attending a specific event
export const getUsersAttendingEvent = async (eventId) => {
  try {
    // Check if the event exists
    const isValidObjectId = mongoose.Types.ObjectId.isValid(eventId);
    if (!isValidObjectId) {
      throw new Error('Invalid event ID');
    }

    const eventExists = await Event.exists({ _id: mongoose.Types.ObjectId.createFromHexString(eventId) });
    if (!eventExists) {
      throw new Error('Event not found');
    }
    const attendances = await Attend.find({ eventId });
    const userIds = attendances.map(attendance => attendance.userId);
    return userIds;
  } catch (error) {
    throw new Error(`Error while fetching users attending event: ${error.message}`);
  }
};

// Get events attended by a specific user
export const getEventsAttendByThisUser = async (userId) => {
  try {
    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      throw new Error('User does not exist');
    }
    const attendEvents = await Attend.find({ userId });
    const eventIds = attendEvents.map(attendance => attendance.eventId);
    return eventIds;
  } catch (error) {
    throw new Error(`Error while fetching events attended by a user: ${error.message}`);
  }
};