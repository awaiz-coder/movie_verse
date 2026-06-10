import axios from 'axios';

const API_BASE_URL = 'https://movie-verse-amber.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});


// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

// Movies API
export const moviesAPI = {
  getAll: (params = {}) => api.get('/movies', { params }),
  getById: (id) => api.get(`/movies/${id}`),
  create: (movieData) => api.post('/movies', movieData),
  update: (id, movieData) => api.put(`/movies/${id}`, movieData),
  delete: (id) => api.delete(`/movies/${id}`),
  getGenres: () => api.get('/movies/genres'),
  getLanguages: () => api.get('/movies/languages'),
  getByLanguage: (language) => api.get(`/movies/language/${language}`),
};

// Reviews API
export const reviewsAPI = {
  getByMovie: (movieId) => api.get(`/reviews/movie/${movieId}`),
  create: (movieId, reviewData) => api.post(`/reviews/movie/${movieId}`, reviewData),
  update: (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData),
  delete: (reviewId) => api.delete(`/reviews/${reviewId}`),
  getUserReviews: () => api.get('/reviews/my-reviews'),
  getAllReviews: () => api.get('/reviews/all'),  // Add this for admin
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  delete: (id) => api.delete(`/users/${id}`),
  toggleWatchlist: (movieId) => api.post(`/users/watchlist/${movieId}`),
  getWatchlist: () => api.get('/users/watchlist'),
};



export default api;