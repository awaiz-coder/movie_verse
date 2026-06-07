import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await reviewsAPI.getAllReviews();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId, userName) => {
    if (window.confirm(`Are you sure you want to delete this review by ${userName}?`)) {
      try {
        await reviewsAPI.delete(reviewId);
        setReviews(reviews.filter(review => review._id !== reviewId));
        alert('Review deleted successfully');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Error deleting review');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="card">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Manage Reviews</h2>
      <p>Total Reviews: {reviews.length}</p>
      
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review._id} className="card" style={{ marginBottom: '1rem' }}>
            <div className="review-header">
              <div className="review-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={review.user?.avatar || 'https://via.placeholder.com/40/1a1a1a/666666?text=U'} 
                  alt={review.user?.name}
                  className="avatar"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/40/1a1a1a/666666?text=U';
                  }}
                />
                <div>
                  <strong>{review.user?.name || 'Unknown User'}</strong>
                  <div style={{ color: '#888', fontSize: '0.9rem' }}>
                    {review.user?.email}
                  </div>
                </div>
              </div>
              <div className="review-rating" style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '1.1rem' }}>
                ⭐ {review.rating}/5
              </div>
            </div>
            
            <div style={{ margin: '1rem 0' }}>
              <strong>Movie:</strong> {review.movie?.title || 'Unknown Movie'}
            </div>
            
            <p style={{ margin: '1rem 0', color: '#ccc', lineHeight: '1.5' }}>
              {review.comment}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>
                {new Date(review.createdAt).toLocaleDateString()} at {new Date(review.createdAt).toLocaleTimeString()}
              </span>
              <button 
                className="btn btn-danger"
                onClick={() => handleDeleteReview(review._id, review.user?.name)}
              >
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Reviews Found</h3>
          <p>There are no reviews in the system yet.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;