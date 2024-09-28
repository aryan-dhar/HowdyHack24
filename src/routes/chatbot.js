const express = require('express');
const router = express.Router();

router.post('/message', (req, res) => {
  const userMessage = req.body.message;
  // Chatbot logic here
  res.send("Chatbot response to user's input");
});

module.exports = router;