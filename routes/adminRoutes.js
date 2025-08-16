// routes/adminRoutes.js
import express from "express";
import {
  createSession,
  updateSession,
  deleteSession,
  getAllSessionsForAdmin,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin — get all sessions
router.get("/sessions", protect, adminOnly, getAllSessionsForAdmin);

// Admin — create new meditation session
router.post("/sessions", protect, adminOnly, createSession);

// Admin — update existing meditation session
router.put("/sessions/:id", protect, adminOnly, updateSession);

// Admin — delete meditation session
router.delete("/sessions/:id", protect, adminOnly, deleteSession);

export default router;
