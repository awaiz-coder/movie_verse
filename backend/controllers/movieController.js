const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const genre = req.query.genre;
    const year = req.query.year;
    const rating = req.query.rating;
    const search = req.query.search;
    const language = req.query.language;

    let query = {};

    if (genre && genre !== 'all') {
      query.genre = { $in: [new RegExp(genre, 'i')] };
    }

    if (year && year !== 'all') {
      query.releaseYear = parseInt(year);
    }

    if (rating && rating !== 'all') {
      const minRating = parseFloat(rating);
      query.averageRating = { $gte: minRating };
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (language && language !== 'all') {
      query.language = { $regex: language, $options: 'i' };
    }

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Delete associated reviews
    await Review.deleteMany({ movie: req.params.id });

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMoviesByLanguage = async (req, res) => {
  try {
    const language = req.params.language;
    const movies = await Movie.find({ language: new RegExp(language, 'i') });
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGenres = async (req, res) => {
  try {
    const genres = await Movie.distinct('genre');
    const flattenedGenres = [...new Set(genres.flat())];
    res.json(flattenedGenres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLanguages = async (req, res) => {
  try {
    const languages = await Movie.distinct('language');
    res.json(languages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};