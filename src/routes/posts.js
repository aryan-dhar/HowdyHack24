const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Route to create a new post
router.post('/create', async (req, res) => {
  const { message, category } = req.body;
  try {
    const newPost = new Post({ message, category });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create post' });
  }
});

// Route to get all posts (optionally filter by category)
router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  try {
    const posts = await Post.find(filter).sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch posts' });
  }
});

module.exports = router;