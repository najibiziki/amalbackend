import express from "express";
import { getLatestInstagramPosts } from "../services/instagramService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await getLatestInstagramPosts();

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Instagram error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch Instagram posts",
    });
  }
});

export default router;
