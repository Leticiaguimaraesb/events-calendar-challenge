import express from "express";
import {
  createEvent,
  findManyEvents,
  findEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createEvent);
router.get("/", findManyEvents);
router.get("/:id", findEventById);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
