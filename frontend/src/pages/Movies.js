import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { moviesAPI } from '../services/api';
import MovieGrid from '../components/movies/MovieGrid';
import Filter from '../components/common/Filter';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: searchParams.get('genre') || 'all',
    language: searchParams.get('language') || 'all',
    year: searchParams.get('year') || 'all',
    rating: searchParams.get('rating') || 'all',
    search: searchParams.get('search') || ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalMovies: 0
  });

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setFilters({
      genre: searchParams.get('genre') || 'all',
      language: searchParams.get('language') || 'all',
      year: searchParams.get('year') || 'all',
      rating: searchParams.get('rating') || 'all',
      search: searchParams.get('search') || ''
    });
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, [searchParams]);

  useEffect(() => {
    fetchMovies();
  }, [filters, pagination.currentPage]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 12,
        ...filters
      };

      // Remove 'all' values from params
      Object.keys(params).forEach(key => {
        if (params[key] === 'all' || params[key] === '') {
          delete params[key];
        }
      });

      const response = await moviesAPI.getAll(params);
      setMovies(response.data.movies || response.data);
      setPagination({
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
        totalMovies: response.data.totalMovies || response.data.length
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] && newFilters[key] !== 'all') {
        newSearchParams.set(key, newFilters[key]);
      }
    });
    setSearchParams(newSearchParams);
  };

  const handleClearFilters = () => {
    setFilters({
      genre: 'all',
      language: 'all',
      year: 'all',
      rating: 'all',
      search: ''
    });
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="container">
        <div style={{ padding: '2rem 0' }}>
          <h1>Browse Movies</h1>
          <p>Discover {pagination.totalMovies} amazing movies in our collection</p>
        </div>

        <Filter 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <MovieGrid movies={movies} />
            
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;