import React, { useState, useEffect } from 'react';
import { moviesAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: [],
    releaseYear: new Date().getFullYear(),
    duration: '',
    director: '',
    poster: '',
    trailer: '',
    language: 'Hindi'
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await moviesAPI.getAll();
      setMovies(response.data.movies || response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selectedGenres = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedGenres.push(options[i].value);
      }
    }
    setFormData(prev => ({
      ...prev,
      genre: selectedGenres
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingMovie) {
        await moviesAPI.update(editingMovie._id, formData);
      } else {
        await moviesAPI.create(formData);
      }
      
      setShowForm(false);
      setEditingMovie(null);
      setFormData({
        title: '',
        description: '',
        genre: [],
        releaseYear: new Date().getFullYear(),
        duration: '',
        director: '',
        poster: '',
        trailer: '',
        language: 'Hindi'
      });
      fetchMovies();
    } catch (error) {
      console.error('Error saving movie:', error);
      alert('Error saving movie: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      duration: movie.duration,
      director: movie.director,
      poster: movie.poster,
      trailer: movie.trailer,
      language: movie.language
    });
    setShowForm(true);
  };

  const handleDelete = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie? This will also delete all reviews for this movie.')) {
      try {
        await moviesAPI.delete(movieId);
        fetchMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Error deleting movie');
      }
    }
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingMovie(null);
    setFormData({
      title: '',
      description: '',
      genre: [],
      releaseYear: new Date().getFullYear(),
      duration: '',
      director: '',
      poster: '',
      trailer: '',
      language: 'Hindi'
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage Movies</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New Movie
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Genre</label>
              <select
                multiple
                value={formData.genre}
                onChange={handleGenreChange}
                className="form-control"
                required
                style={{ height: '120px' }}
              >
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Crime">Crime</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
              </select>
              <small>Hold Ctrl to select multiple genres</small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Release Year</label>
                <input
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g., 2h 30m"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Director</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Poster URL</label>
              <input
                type="url"
                name="poster"
                value={formData.poster}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Trailer URL</label>
              <input
                type="url"
                name="trailer"
                value={formData.trailer}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Malayalam">Malayalam</option>
                <option value="English">English</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                {editingMovie ? 'Update Movie' : 'Add Movie'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie._id} className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <img 
                src={movie.poster} 
                alt={movie.title}
                style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x150/1a1a1a/666666?text=No+Image';
                }}
              />
              <div style={{ flex: 1 }}>
                <h4>{movie.title} ({movie.releaseYear})</h4>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                <p><strong>Rating:</strong> ⭐ {movie.averageRating || 'N/A'}</p>
                <p style={{ marginTop: '0.5rem' }}>{movie.description.substring(0, 150)}...</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleEdit(movie)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieManagement;