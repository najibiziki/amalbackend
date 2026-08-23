import "dotenv/config";
import mongoose from "mongoose";
import Project from "./models/Project.js";

const projects = [
  {
    title: "Community Support",
    category: "Community",
    description:
      "Supporting people and families through practical help, solidarity, and community initiatives.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Education & Opportunity",
    category: "Education",
    description:
      "Creating opportunities for learning, growth, and a better future for young people.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Together for Change",
    category: "Solidarity",
    description:
      "Bringing volunteers together to create meaningful change in local communities.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
  },
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Project.deleteMany({});
    await Project.insertMany(projects);

    console.log("✅ Projects added successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seedProjects();
