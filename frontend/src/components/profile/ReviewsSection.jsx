import React, { useState } from 'react';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Pagination from '../common/Pagination';

const ReviewItem = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    if (review.content.length > 150) {
      setExpanded(!expanded);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <div className="reviewer-info">
          <img src={review.reviewer.avatar} alt={review.reviewer.name} className="reviewer-avatar" />
          <div>
            <h3 className="reviewer-name">{review.reviewer.name}</h3>
            <p className="review-date">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="review-rating">
          <Rating value={review.rating} readOnly />
          <span className="rating-text">{review.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="review-skill">
        <span className="skill-label">Skill:</span>
        <span className="skill-name">{review.skill}</span>
      </div>
      
      <div className="review-content">
        {review.content.length > 150 && !expanded ? (
          <>
            <p>{review.content.substring(0, 150)}...</p>
            <button className="read-more" onClick={toggleExpand}>Read more</button>
          </>
        ) : (
          <>
            <p>{review.content}</p>
            {review.content.length > 150 && expanded && (
              <button className="read-less" onClick={toggleExpand}>Read less</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ReviewsSection = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="reviews-section">
      <div className="section-header">
        <h2>Reviews</h2>
        <div className="overall-rating">
          <Rating value={averageRating} readOnly size="large" />
          <span className="rating-text">{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
        </div>
      </div>
      
      <div className="reviews-list">
        {reviews.length > 0 ? (
          currentReviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p className="no-reviews-message">No reviews yet.</p>
        )}
      </div>
      
      {reviews.length > reviewsPerPage && (
        <div className="pagination-container">
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(reviews.length / reviewsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Card>
  );
};

export default ReviewsSection;