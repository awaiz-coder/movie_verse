const express = require('express');
const {
  getReviewsByMovie,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews,
  getAllReviews  // Add this new import
} = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/movie/:movieId', getReviewsByMovie);
router.get('/my-reviews', auth, getUserReviews);
router.get('/all', auth, admin, getAllReviews);  // Add this new route for admin
router.post('/movie/:movieId', auth, createReview);
router.put('/:reviewId', auth, updateReview);
router.delete('/:reviewId', auth, deleteReview);

module.exports = router;