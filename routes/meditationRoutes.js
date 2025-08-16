// routes/meditationRoutes.js
import express from "express";
import {
  getAllSessions,
  getSessionById,
  completeMeditation,
  searchSessions,
} from "../controllers/meditationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all meditation sessions
router.get("/", getAllSessions);

// Search meditation sessions
router.get("/search", searchSessions);

// Get single meditation session
router.get("/:id", getSessionById);

// Mark meditation as completed
router.post("/complete", protect, completeMeditation);

export default router;
