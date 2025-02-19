const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // 🔍 Debugging

    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBlog = new Blog({ title, content, author });
    const savedBlog = await newBlog.save();
    
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find(); // ✅ Ensure 'Blog' is a valid model
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
