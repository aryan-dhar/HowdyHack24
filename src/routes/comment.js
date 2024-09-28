const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Route to add a comment to a post
router.post('/add', async (req, res) => {
  const { postId, message } = req.body;
  try {
    const newComment = new Comment({ postId, message });
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add comment' });
  }
});

// Route to get comments for a specific post
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).sort({ timestamp: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch comments' });
  }
});

module.exports = router;