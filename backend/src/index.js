import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import dressRoutes from "./routes/dress.route.js";
import weatherRouter from './routes/weather.route.js';
import recommendationRouter from './routes/recommendation.route.js';
// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined in .env
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: '10mb' })); // Parse JSON requests with a limit of 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded requests with a limit of 10MB
app.use(cookieParser()); // Parse cookies
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dress", dressRoutes);
app.use('/api', weatherRouter);
app.use('/api', recommendationRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Serve the frontend's index.html for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB(); // Connect to the database
}); 