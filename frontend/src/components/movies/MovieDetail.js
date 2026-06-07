import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { moviesAPI, reviewsAPI, usersAPI } from '../../services/api';
import ReviewForm from '../reviews/ReviewForm';
import ReviewList from '../reviews/ReviewList';
import LoadingSpinner from '../common/LoadingSpinner';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inWatchlist, setInWatchlist] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const [movieResponse, reviewsResponse] = await Promise.all([
        moviesAPI.getById(id),
        reviewsAPI.getByMovie(id)
      ]);
      
      setMovie(movieResponse.data);
      setReviews(reviewsResponse.data);
      
      // Check if movie is in user's watchlist
      if (user && user.watchlist) {
        setInWatchlist(user.watchlist.includes(id));
      }
    } catch (error) {
      setError('Movie not found');
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      alert('Please login to manage your watchlist');
      return;
    }

    try {
      await usersAPI.toggleWatchlist(id);
      setInWatchlist(!inWatchlist);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
    // Update movie rating
    if (movie) {
      const newAverageRating = calculateNewAverage(newReview.rating);
      setMovie({ ...movie, averageRating: newAverageRating });
    }
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(reviews.filter(review => review._id !== reviewId));
  };

  const calculateNewAverage = (newRating) => {
    if (reviews.length === 0) return newRating;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0) + newRating;
    return parseFloat((total / (reviews.length + 1)).toFixed(1));
  };

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="container"><div className="error-message">{error}</div></div>;
  if (!movie) return <div className="container"><div>Movie not found</div></div>;

  const videoId = extractVideoId(movie.trailer);

  return (
    <div className="container movie-detail">
      <div className="movie-header">
        <div className="movie-poster-section">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="movie-poster-large"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/666666?text=No+Image';
            }}
          />
        </div>

        <div className="movie-content">
          <h1>{movie.title}</h1>
          
          <div className="movie-meta-large">
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span>{movie.language}</span>
            <span>•</span>
            <span className="movie-rating">⭐ {movie.averageRating || 'N/A'}</span>
          </div>

          <div className="movie-genres">
            {movie.genre.map(genre => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>

          <p><strong>Director:</strong> {movie.director}</p>

          <p className="movie-description">{movie.description}</p>

          <div className="movie-actions">
            <button 
              className={`btn ${inWatchlist ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleWatchlistToggle}
            >
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            
            {videoId && (
              <button 
                className="btn btn-secondary"
                onClick={() => setShowTrailer(true)}
              >
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && videoId && (
        <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setShowTrailer(false)}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews ({reviews.length})</h2>
        
        {isAuthenticated ? (
          <ReviewForm 
            movieId={id} 
            onReviewAdded={handleReviewAdded}
          />
        ) : (
          <div className="card">
            <p>Please <a href="/login">login</a> to write a review</p>
          </div>
        )}
        
        <ReviewList 
          reviews={reviews}
          onReviewDeleted={handleReviewDeleted}
        />
      </div>
    </div>
  );
};

export default MovieDetail;