import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

// Save name
router.post("/names", auth, async (req, res) => {
  try {
    const { name, gender, origin, meaning } = req.body;

    // Check if name already exists
    const nameExists = req.user.savedNames.some(
      (savedName) => savedName.name === name
    );
    if (nameExists) {
      return res.status(400).json({ message: "Name already saved" });
    }

    req.user.savedNames.push({ name, gender, origin, meaning });
    await req.user.save();
    res.status(201).json(req.user.savedNames);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error saving name", error: error.message });
  }
});

// Get saved names
router.get("/names", auth, async (req, res) => {
  try {
    res.json(req.user.savedNames);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting names", error: error.message });
  }
});

// Delete saved name
router.delete("/names/:id", auth, async (req, res) => {
  try {
    req.user.savedNames = req.user.savedNames.filter(
      (name) => name._id.toString() !== req.params.id
    );
    await req.user.save();
    res.json(req.user.savedNames);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting name", error: error.message });
  }
});

// Create blog post
router.post("/blog", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    req.user.blogPosts.push({ title, content });
    await req.user.save();
    res.status(201).json(req.user.blogPosts);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating post", error: error.message });
  }
});

// Get blog posts
router.get("/blog", auth, async (req, res) => {
  try {
    res.json(req.user.blogPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting posts", error: error.message });
  }
});

export default router;
