import React from 'react';
import { GENRES, LANGUAGES, RATINGS } from '../../utils/constants';

const Filter = ({ filters, onFilterChange, onClearFilters }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="filter-section">
      <div className="container">
        <div className="filter-grid">
          <div className="form-group">
            <label>Genre</label>
            <select 
              value={filters.genre} 
              onChange={(e) => onFilterChange('genre', e.target.value)}
              className="form-control"
            >
              <option value="all">All Genres</option>
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <select 
              value={filters.language} 
              onChange={(e) => onFilterChange('language', e.target.value)}
              className="form-control"
            >
              <option value="all">All Languages</option>
              {LANGUAGES.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select 
              value={filters.year} 
              onChange={(e) => onFilterChange('year', e.target.value)}
              className="form-control"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Rating</label>
            <select 
              value={filters.rating} 
              onChange={(e) => onFilterChange('rating', e.target.value)}
              className="form-control"
            >
              {RATINGS.map(rating => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button onClick={onClearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;