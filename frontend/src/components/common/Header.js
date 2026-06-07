import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            MovieVerse
          </Link>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            {isAuthenticated && <li><Link to="/watchlist">Watchlist</Link></li>}
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="navbar-right">
            <SearchBar />
            <div className="user-menu">
              {isAuthenticated ? (
                <div className="user-dropdown">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="avatar"
                    />
                    <span>{user.name}</span>
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <Link to="/profile" onClick={() => setShowDropdown(false)}>
                        Profile
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setShowDropdown(false)}>
                          Admin Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to="/login" className="btn btn-secondary">
                    User Login
                  </Link>
                  <Link to="/admin-login" className="btn btn-primary">
                    Admin Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;