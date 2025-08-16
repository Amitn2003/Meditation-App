import Session from "../models/Session.js";
import { sessionSchema } from "../validators/sessionValidator.js";

// Get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add session (Admin only)
export const addSession = async (req, res) => {
  try {
    const parsed = sessionSchema.parse(req.body);
    const session = new Session(parsed);
    await session.save();
    res.status(201).json({ message: "Session added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete session
export const deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
