import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import instagramRouter from "./routes/instagram.js";
import paymentRouter from "./routes/payment.js";
import projectRoutes from "./routes/project.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
await connectDB();

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀",
  });
});

// Routes
app.use("/api/instagram", instagramRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/projects", projectRoutes);

export default app;
