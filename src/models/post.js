const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  message: { type: String, required: true },
  category: { type: String, enum: ['Anxiety', 'Depression', 'Stress', 'Other'], default: 'Other' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);