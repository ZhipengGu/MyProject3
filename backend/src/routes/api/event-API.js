/**
 * This file defines routes for CRUD operations on events, including
 * getting nearby events, fetching by tags, fetching user-specific events, 
 * creating, updating, and deleting events. Uses authentication middleware 
 * to protect routes requiring authentication. Implements error handling.
 */

import express from "express";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getAllEventsByUserId, getSearchedEvents, getEventsByTags, getEventsNearby } from '../../controllers/event-dao.js';
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pages = req.query.page ? req.query.page : 0;

    const events = await getAllEvents(pages);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get searched events by given keywords and pages: /api/events/search?title=someTitle&description=someDescription&page=1
router.get('/search', async (req, res) => {
  try {
    const { title, description, page } = req.query;
    if((!title||title=="")&&(!description||description=="")){
      res.status(400).send("Invalid search term!");
      return;
    }

    const events = await getSearchedEvents(title, description, page);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng, distance } = req.query;
    const events = await getEventsNearby(lat, lng, distance);
    res.status(200).json(events);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/tags", async (req, res) => {
  try {
    const tags = req.body.tags;
    const page = req.query.page ? req.query.page : 0;
    const events = await getEventsByTags(tags, page);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/me', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const events = await getAllEventsByUserId(userId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await getEventById(eventId);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json(event);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const eventData = req.body;
    eventData.userId = userId;
    const newEvent = await createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:eventId', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const eventId = req.params.eventId;
    const eventData = req.body;
    const updatedEvent = await updateEvent(userId, eventId, eventData);
    if (!updatedEvent) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json(updatedEvent);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:eventId', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const eventId = req.params.eventId;
    const deletedEvent = await deleteEvent(userId, eventId);
    if (!deletedEvent) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json({ message: 'Event deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
