import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { moviesAPI } from '../services/api';
import MovieGrid from '../components/movies/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [featuredResponse, recentResponse] = await Promise.all([
        moviesAPI.getAll({ limit: 8, rating: '4' }),
        moviesAPI.getAll({ limit: 8, sort: 'newest' })
      ]);

      setFeaturedMovies(featuredResponse.data.movies || featuredResponse.data);
      setRecentMovies(recentResponse.data.movies || recentResponse.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to MovieVerse</h1>
          <p>
            Discover, rate, and review your favorite movies. Join our community of movie enthusiasts 
            and share your cinematic experiences with the world.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/movies" className="btn btn-primary">
              Explore Movies
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Highly Rated Movies</h2>
          <Link to="/movies?rating=4" className="btn btn-secondary">
            View All
          </Link>
        </div>
        <MovieGrid movies={featuredMovies} />
      </section>

      {/* Recent Movies */}
      <section className="container" style={{ padding: '2rem 0 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Recently Added</h2>
          <Link to="/movies" className="btn btn-secondary">
            View All
          </Link>
        </div>
        <MovieGrid movies={recentMovies} />
      </section>

      {/* Features Section */}
      <section style={{ background: '#1a1a1a', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Choose MovieVerse?</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div className="card">
              <h3>🎬 Extensive Collection</h3>
              <p>Discover movies from various languages and genres across Indian cinema.</p>
            </div>
            <div className="card">
              <h3>⭐ Rate & Review</h3>
              <p>Share your opinions and read reviews from fellow movie lovers.</p>
            </div>
            <div className="card">
              <h3>❤️ Personal Watchlist</h3>
              <p>Save movies you want to watch and keep track of your favorites.</p>
            </div>
            <div className="card">
              <h3>👥 Community Driven</h3>
              <p>Join a vibrant community of cinema enthusiasts and critics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;