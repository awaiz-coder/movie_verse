import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usersAPI } from '../../services/api';

const MovieCard = ({ movie, onWatchlistUpdate }) => {
  const { isAuthenticated, user } = useAuth();

  const handleWatchlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Please login to add to watchlist');
      return;
    }

    try {
      await usersAPI.toggleWatchlist(movie._id);
      if (onWatchlistUpdate) {
        onWatchlistUpdate();
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  const isInWatchlist = user?.watchlist?.includes(movie._id);

  return (
    <div className="movie-card">
      <div className="movie-poster-container" style={{ position: 'relative' }}>
        <Link to={`/movie/${movie._id}`}>
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="movie-poster"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/666666?text=No+Image';
            }}
          />
        </Link>
        {isAuthenticated && (
          <button 
            className={`watchlist-btn ${isInWatchlist ? 'active' : ''}`}
            onClick={handleWatchlistToggle}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: isInWatchlist ? '#e74c3c' : 'rgba(0,0,0,0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isInWatchlist ? '✓' : '+'}
          </button>
        )}
      </div>
      <div className="movie-info">
        <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="movie-title">{movie.title}</h3>
        </Link>
        <div className="movie-meta">
          <span>{movie.releaseYear}</span>
          <span className="movie-rating">⭐ {movie.averageRating || 'N/A'}</span>
        </div>
        <div className="movie-genres">
          {movie.genre.slice(0, 2).map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;