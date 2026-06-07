import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, onReviewDeleted }) => {
  if (reviews.length === 0) {
    return (
      <div className="card">
        <p style={{ textAlign: 'center', color: '#888' }}>
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map(review => (
        <ReviewItem 
          key={review._id} 
          review={review}
          onReviewDeleted={onReviewDeleted}
        />
      ))}
    </div>
  );
};

export default ReviewList;