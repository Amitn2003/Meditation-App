// controllers/adminController.js
import User from "../models/User.js";
import MeditationSession from "../models/MeditationSession.js";
import { ZodError } from "zod";

/**
 * Get all users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new meditation session (Admin)
 */
export const createSession = async (req, res, next) => {
  try {
    const { title, description, duration, style, music } = req.body;

    if (!title || !description || !duration || !style) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const session = await MeditationSession.create({
      title,
      description,
      duration,
      style,
      music,
    });

    res.status(201).json({
      message: "Session added successfully",
      session,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    next(error);
  }
};

/**
 * Update meditation session (Admin)
 */
export const updateSession = async (req, res, next) => {
  try {
    const { id } = req.params;

    const session = await MeditationSession.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const updatedSession = await MeditationSession.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Session updated successfully",
      session: updatedSession,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete meditation session (Admin)
 */
export const deleteSession = async (req, res, next) => {
  try {
    const { id } = req.params;

    const session = await MeditationSession.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await MeditationSession.findByIdAndDelete(id);
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a user (Admin)
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};


/**
 * Get all meditation sessions (Admin)
 */
export const getAllSessionsForAdmin = async (req, res, next) => {
  try {
    const sessions = await MeditationSession.find({});
    res.json(sessions);
  } catch (error) {
    next(error);
  } 
};