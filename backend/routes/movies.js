const express = require('express');
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByLanguage,
  getGenres,
  getLanguages
} = require('../controllers/movieController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', getAllMovies);
router.get('/genres', getGenres);
router.get('/languages', getLanguages);
router.get('/language/:language', getMoviesByLanguage);
router.get('/:id', getMovieById);

// Admin routes
router.post('/', auth, admin, createMovie);
router.put('/:id', auth, admin, updateMovie);
router.delete('/:id', auth, admin, deleteMovie);

module.exports = router;