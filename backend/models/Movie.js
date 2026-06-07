const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);