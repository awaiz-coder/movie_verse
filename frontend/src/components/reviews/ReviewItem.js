import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ReviewItem = ({ review, onReviewDeleted }) => {
  const { user } = useAuth();
  const isOwner = user && user._id === review.user._id;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await onReviewDeleted(review._id);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  return (
    <div className="review-item card">
      <div className="review-header">
        <div className="review-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src={review.user.avatar || 'https://via.placeholder.com/40/1a1a1a/666666?text=U'} 
            alt={review.user.name}
            className="avatar"
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40/1a1a1a/666666?text=U';
            }}
          />
          <div>
            <strong>{review.user.name}</strong>
            <div className="review-rating" style={{ color: '#ffd700', fontWeight: 'bold' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
          </div>
        </div>
        
        <div className="review-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="review-date" style={{ color: '#888' }}>
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
          {isOwner && (
            <button 
              onClick={handleDelete}
              className="btn btn-danger btn-sm"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      
      <p style={{ marginTop: '1rem', color: '#ccc', lineHeight: '1.5' }}>{review.comment}</p>
    </div>
  );
};

export default ReviewItem;