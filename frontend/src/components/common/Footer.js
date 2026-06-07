import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#1a1a1a',
      padding: '2rem 0',
      marginTop: 'auto',
      borderTop: '1px solid #333'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>MovieVerse</h3>
            <p style={{ color: '#888', lineHeight: '1.6' }}>
              Your ultimate destination for movie ratings, reviews, and recommendations. 
              Discover new films and share your opinions with the community.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', color: '#888' }}>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/movies" style={{ color: '#888', textDecoration: 'none' }}>Movies</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/about" style={{ color: '#888', textDecoration: 'none' }}>About</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/contact" style={{ color: '#888', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Connect</h4>
            <div style={{ color: '#888' }}>
              <p>Email: info@movieverse.com</p>
              <p>Phone: +1 234 567 890</p>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #333',
          paddingTop: '1rem',
          textAlign: 'center',
          color: '#666'
        }}>
          <p>&copy; 2024 MovieVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;