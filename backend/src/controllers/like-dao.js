/**
 * This file contains all the functions that are used in like-API.js
 * including createLike, deleteLike, getUsersLikeEvent, getEventsLikedByThisUser
 */

import Like from "../models/Like-schema.js";
import Event from "../models/Event-schema.js";
import User from '../models/Users-schema.js';
import mongoose from "mongoose";

// Create a Like record
export const createLike = async (eventId, userId) => {
  try {
    // Check if the user already likes the event
    const existingLike = await Like.findOne({ eventId, userId });
    if (existingLike) {
      throw new Error('User has already liked this event');
    }
    const like = new Like({ eventId, userId });
    await like.save();
    return like;
  } catch (error) {
    throw new Error(`Error while creating new like record: ${error.message}`);
  }
};

// Delete a like record
export const deleteLike = async (eventId, userId) => {
  try {
    // Check if the user already likes the event
    const existingLike = await Like.findOne({ eventId, userId });
    if (!existingLike) {
      throw new Error('User has not liked this event');
    }
    // If the user likes the event, delete the like record
    const deletedLike = await Like.findByIdAndDelete(existingLike._id);
    if (!deletedLike) {
      throw new Error('Failed to delete like record');
    }
    return deletedLike;
  } catch (error) {
    throw new Error(`Error while deleting like record: ${error.message}`);
  }
};

// Get all users who like a specific event
export const getUsersLikeEvent = async (eventId) => {
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
    const likedUsers = await Like.find({ eventId });
    const userIds = likedUsers.map(likeUser => likeUser.userId);
    return userIds;
  } catch (error) {
    throw new Error(`Error while fetching users who like the event: ${error.message}`);
  }
};

// Get all events liked by a specific event
export const getEventsLikedByUser = async (userId) => {
  try {
    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      throw new Error('User not found');
    }
    const likedEvents = await Like.find({ userId });
    const eventIds = likedEvents.map(likeEvent => likeEvent.eventId);
    return eventIds;
  } catch (error) {
    throw new Error(`Error while fetching events liked by a user: ${error.message}`);
  }
};