import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { moviesAPI, usersAPI, reviewsAPI } from '../../services/api';
import MovieManagement from './MovieManagement';
import UserManagement from './UserManagement';
import ReviewManagement from './ReviewManagement';
import LoadingSpinner from '../common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }
    
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, navigate]);

  const fetchStats = async () => {
    try {
      const [moviesResponse, usersResponse, reviewsResponse] = await Promise.all([
        moviesAPI.getAll({ limit: 1000 }), // Get all movies for stats
        usersAPI.getAll(),
        reviewsAPI.getUserReviews()
      ]);

      const totalMovies = moviesResponse.data.totalMovies || moviesResponse.data.movies?.length || moviesResponse.data.length || 0;
      const totalUsers = usersResponse.data.length;
      const totalReviews = reviewsResponse.data.length;

      // Calculate average platform rating
      const allMovies = moviesResponse.data.movies || moviesResponse.data || [];
      const ratedMovies = allMovies.filter(movie => movie.averageRating > 0);
      const averagePlatformRating = ratedMovies.length > 0 
        ? parseFloat((ratedMovies.reduce((sum, movie) => sum + (movie.averageRating || 0), 0) / ratedMovies.length).toFixed(1))
        : 0;

      // Find most rated movie
      const mostRatedMovie = allMovies.reduce((most, movie) => {
        return (movie.totalRatings || 0) > (most.totalRatings || 0) ? movie : most;
      }, allMovies[0] || { title: 'N/A' });

      setStats({
        totalMovies,
        totalUsers,
        totalReviews,
        averagePlatformRating,
        mostRatedMovie: mostRatedMovie.title || 'N/A',
        mostRatedCount: mostRatedMovie.totalRatings || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (loading) return <LoadingSpinner />;

  // If not admin after loading, show access denied
  if (!isAdmin) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Access Denied</h2>
          <p>You must be an administrator to access this page.</p>
          <button 
            onClick={() => navigate('/admin-login')}
            className="btn btn-primary"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container admin-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ color: '#888' }}>
          Welcome, <strong>{user?.name}</strong>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'movies' ? 'active' : ''}`}
          onClick={() => setActiveTab('movies')}
        >
          Manage Movies
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Manage Reviews
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'dashboard' && stats && (
          <div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{stats.totalMovies}</div>
                <div className="stat-label">Total Movies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.totalReviews}</div>
                <div className="stat-label">Total Reviews</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.averagePlatformRating}</div>
                <div className="stat-label">Avg Platform Rating</div>
              </div>
            </div>

            <div className="card">
              <h3>Platform Overview</h3>
              <p><strong>Most Rated Movie:</strong> {stats.mostRatedMovie} ({stats.mostRatedCount} ratings)</p>
              <p><strong>Average Rating:</strong> ⭐ {stats.averagePlatformRating}/5</p>
              <p><strong>Total Content:</strong> {stats.totalMovies} movies across multiple languages</p>
            </div>
          </div>
        )}

        {activeTab === 'movies' && <MovieManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'reviews' && <ReviewManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;