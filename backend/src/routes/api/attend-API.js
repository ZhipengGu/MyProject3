/**
 * There are four attend-related routes in this file, 
 * Routes Include posting a new event,deleting an existing event,
 * getting an event by event id,getting all events created by a specific logging user.
 * Uses authentication middleware for protected routes.
 */

import express from "express";
import { createAttend, deleteAttend, getUsersAttendingEvent, getEventsAttendByThisUser } from '../../controllers/attend-dao.js';
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const newAttend = await createAttend(eventId, userId);
    res.status(201).json(newAttend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { eventId } = req.body;
    await deleteAttend(eventId, userId);
    res.status(204).json({ message: 'Attend deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const users = await getUsersAttendingEvent(eventId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const events = await getEventsAttendByThisUser(userId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;