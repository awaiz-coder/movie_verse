const User = require('../models/User');
const Review = require('../models/Review');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user's reviews
    await Review.deleteMany({ user: req.params.id });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.toggleWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movieId = req.params.movieId;

    const isInWatchlist = user.watchlist.includes(movieId);

    if (isInWatchlist) {
      user.watchlist.pull(movieId);
    } else {
      user.watchlist.push(movieId);
    }

    await user.save();
    res.json({ 
      message: isInWatchlist ? 'Removed from watchlist' : 'Added to watchlist',
      watchlist: user.watchlist 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('watchlist');
    res.json(user.watchlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};