const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  message: { type: String, required: true },
  category: { type: String, enum: ['anxiety', 'depression', 'stress', 'other'], default: 'other' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);