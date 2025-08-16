import mongoose from "mongoose";

const meditationSessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  style: { type: String, required: true }, // e.g., mindfulness, NSDR, breathing
  duration: { type: Number, required: true }, // default length in minutes
  url: { type: String },
  description: String
}, { timestamps: true });

const MeditationSession = mongoose.model("MeditationSession", meditationSessionSchema);
export default MeditationSession;
