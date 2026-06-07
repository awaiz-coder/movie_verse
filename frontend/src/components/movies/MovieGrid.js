import React from 'react';
import MovieCard from '../common/MovieCard';

const MovieGrid = ({ movies, onWatchlistUpdate }) => {
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

export default MovieGrid;