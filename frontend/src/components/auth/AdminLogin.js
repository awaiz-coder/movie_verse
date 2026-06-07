import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Check if the logged-in user is an admin
      if (result.user && result.user.role === 'admin') {
        navigate(from, { replace: true });
      } else {
        setError('Access denied. Admin privileges required.');
        // Logout the non-admin user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(); // Force refresh to update auth state
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Admin Login</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '1rem' }}>
          Restricted Access - Administrators Only
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@movieverse.com"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Admin Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Logging in...' : 'Admin Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p>
            <Link to="/login" style={{ color: '#667eea' }}>
              User Login
            </Link>
          </p>
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginTop: '1rem',
            padding: '1rem',
            background: '#1a1a1a',
            borderRadius: '5px'
          }}>
            <strong>Default Admin Credentials:</strong><br />
            Email: admin@movieverse.com<br />
            Password: admin123
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;