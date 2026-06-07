import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import MovieGrid from '../components/movies/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Watchlist = () => {
  const { user, isAuthenticated } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWatchlist();
    }
  }, [isAuthenticated]);

  const fetchWatchlist = async () => {
    try {
      const response = await usersAPI.getWatchlist();
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Access Required</h2>
          <p>Please log in to view your watchlist.</p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>My Watchlist</h1>
      <p>You have {watchlist.length} movies in your watchlist</p>
      
      {watchlist.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Your watchlist is empty</h3>
          <p>Start adding movies you want to watch!</p>
        </div>
      ) : (
        <MovieGrid 
          movies={watchlist} 
          onWatchlistUpdate={fetchWatchlist}
        />
      )}
    </div>
  );
};

export default Watchlist;