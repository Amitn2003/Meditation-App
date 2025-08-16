import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import meditationRoutes from "./routes/meditationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*'
}));

app.use(express.json());



// Test root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Test /api route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});




// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meditation", meditationRoutes);
app.use("/api/admin", adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
