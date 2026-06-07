const express = require('express');
const {
  getAllUsers,
  deleteUser,
  toggleWatchlist,
  getWatchlist
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/watchlist', auth, getWatchlist);
router.post('/watchlist/:movieId', auth, toggleWatchlist);

// Admin routes
router.get('/', auth, admin, getAllUsers);
router.delete('/:id', auth, admin, deleteUser);

module.exports = router;