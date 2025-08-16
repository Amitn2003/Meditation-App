import express from "express";
import { getAllSessions, addSession, deleteSession, getSessionById } from "../controllers/sessionController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllSessions);
router.get("/:id", getSessionById);
router.post("/", protect, adminOnly, addSession);
router.delete("/:id", protect, adminOnly, deleteSession);

export default router;
