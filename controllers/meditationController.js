// controllers/meditationController.js
import MeditationSession from "../models/MeditationSession.js";

/**
 * Get all meditation sessions
 */
export const getAllSessions = async (req, res, next) => {
  try {
    const sessions = await MeditationSession.find({});
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single meditation session by ID
 */
export const getSessionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const session = await MeditationSession.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    next(error);
  }
};

/**
 * Track meditation completion for a user
 */
export const completeMeditation = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user._id;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    // Record completion
    const user = req.user;
    if (!user.completedSessions) {
      user.completedSessions = [];
    }

    // Prevent duplicate completions
    if (user.completedSessions.includes(sessionId)) {
      return res
        .status(400)
        .json({ message: "Session already marked as completed" });
    }

    user.completedSessions.push(sessionId);
    await user.save();

    res.json({ message: "Meditation session marked as completed" });
  } catch (error) {
    next(error);
  }
};

/**
 * Search meditation sessions by style or keyword
 */
export const searchSessions = async (req, res, next) => {
  try {
    const { q, style } = req.query;

    const filter = {};
    if (q) {
      filter.title = { $regex: q, $options: "i" };
    }
    if (style) {
      filter.style = style;
    }

    const sessions = await MeditationSession.find(filter);
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};
