const mongoose = require('mongoose');
const Review = require('../models/Review');
const Movie = require('../models/Movie');

exports.getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.movieId;
    const userId = req.user.id;

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({ user: userId, movie: movieId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    const review = new Review({
      user: userId,
      movie: movieId,
      rating,
      comment
    });

    await review.save();

    // Update movie average rating
    await updateMovieRating(movieId);

    // Populate user details for response
    await review.populate('user', 'name avatar');

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.reviewId,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();

    // Update movie average rating
    await updateMovieRating(review.movie);

    await review.populate('user', 'name avatar');
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.reviewId,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const movieId = review.movie;
    await Review.findByIdAndDelete(req.params.reviewId);

    // Update movie average rating
    await updateMovieRating(movieId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('movie', 'title poster releaseYear')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// NEW: Get all reviews for admin
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name avatar email')
      .populate('movie', 'title poster')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fixed Helper function to update movie average rating
const updateMovieRating = async (movieId) => {
  try {
    const result = await Review.aggregate([
      { $match: { movie: new mongoose.Types.ObjectId(movieId) } },
      {
        $group: {
          _id: '$movie',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 }
        }
      }
    ]);

    if (result.length > 0) {
      await Movie.findByIdAndUpdate(movieId, {
        averageRating: parseFloat(result[0].averageRating.toFixed(1)),
        totalRatings: result[0].totalRatings
      });
    } else {
      await Movie.findByIdAndUpdate(movieId, {
        averageRating: 0,
        totalRatings: 0
      });
    }
  } catch (error) {
    console.error('Error updating movie rating:', error);
  }
};