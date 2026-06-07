import React from 'react';

const About = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="card">
        <h1>About MovieVerse</h1>
        <p>
          MovieVerse is your ultimate destination for discovering, rating, and reviewing movies 
          from across Indian cinema. Our platform brings together movie enthusiasts to share 
          their passion for films and create a vibrant community of cinema lovers.
        </p>

        <h2>Our Mission</h2>
        <p>
          To create the most comprehensive and user-friendly movie database and community 
          platform for Indian cinema enthusiasts. We believe in the power of shared experiences 
          and the magic of movies to bring people together.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Extensive collection of movies from various Indian languages</li>
          <li>User-generated ratings and reviews</li>
          <li>Personal watchlist functionality</li>
          <li>Advanced search and filtering options</li>
          <li>Community discussions and interactions</li>
        </ul>

        <h2>Join Our Community</h2>
        <p>
          Whether you're a casual movie watcher or a hardcore cinema enthusiast, MovieVerse 
          has something for everyone. Create an account today to start sharing your movie 
          experiences and discovering new favorites!
        </p>
      </div>
    </div>
  );
};

export default About;