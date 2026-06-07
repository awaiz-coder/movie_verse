import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onWatchlistUpdate }) => {
  if (!movies || movies.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
        <h3>No movies found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard 
          key={movie._id} 
          movie={movie} 
          onWatchlistUpdate={onWatchlistUpdate}
        />
      ))}
    </div>
  );
};

export default MovieList;