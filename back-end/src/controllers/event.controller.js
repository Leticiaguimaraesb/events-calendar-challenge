import {
  createEvent as createEventService,
  findManyEvents as findManyEventsService,
  findEventById as findEventByIdService,
  updateEvent as updateEventService,
  deleteEvent as deleteEventService,
} from "../services/event.service.js";

const createEvent = async (req, res) => {
  try {
    const response = await createEventService(req.body);
    res.status(201).json(response);
  } catch (error) {
    if (error.cause === "conflict") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const findManyEvents = async (req, res) => {
  try {
    const response = await findManyEventsService();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findEventById = async (req, res) => {
  try {
    const response = await findEventByIdService(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    if (error.cause === "not_found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateEvent = async (req, res) => {
  try {
    const response = await updateEventService(req.params.id, req.body);
    res.status(200).json(response);
  } catch (error) {
    if (error.cause === "not_found") {
      res.status(404).json({ error: error.message });
    } else if (error.cause === "conflict") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteEvent = async (req, res) => {
  try {
    await deleteEventService(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.cause === "not_found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export { createEvent, findManyEvents, findEventById, updateEvent, deleteEvent };
