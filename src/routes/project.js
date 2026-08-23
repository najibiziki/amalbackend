import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});

export default router;
