/**
 * This file defines routes for like-related operations.
 * Routes include creating/deleting likes and getting liked events/users.
 * Uses authentication middleware for protected routes.
 */

import express from "express";
import { createLike, deleteLike, getUsersLikeEvent, getEventsLikedByUser } from '../../controllers/like-dao.js';
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { eventId } = req.body;
    const newLike = await createLike(eventId, userId);
    res.status(201).json(newLike);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const { eventId } = req.body;
    const deletedLike = await deleteLike(eventId, userId);
    if (!deletedLike) {
      res.status(404).json({ message: 'Failed to delete like record' });
    } else {
      res.status(204).json({ message: 'Like deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const users = await getUsersLikeEvent(eventId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const events = await getEventsLikedByUser(userId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;