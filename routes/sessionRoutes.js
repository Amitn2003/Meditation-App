import express from "express";
import { getAllSessions, addSession, deleteSession } from "../controllers/sessionController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllSessions);
router.post("/", authMiddleware, adminMiddleware, addSession);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSession);

export default router;
