// components/review/ReviewForm.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import RatingSystem from './RatingSystem';

const ReviewForm = ({ sessionData, onSubmitReview, isLoading }) => {
  const [ratings, setRatings] = useState({
    knowledge: 0,
    communication: 0,
    helpfulness: 0,
    overall: 0
  });
  
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (ratings.overall === 0) {
      newErrors.ratings = 'Please provide a rating';
    }
    
    if (!reviewText.trim()) {
      newErrors.reviewText = 'Please provide review comments';
    } else if (reviewText.trim().length < 10) {
      newErrors.reviewText = 'Review must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmitReview({
        sessionId: sessionData.id,
        ratings,
        reviewText
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="review-form">
      <Card className="session-summary">
        <h3>Session Summary</h3>
        <div className="session-info">
          <div className="info-row">
            <span className="label">Skill:</span>
            <span className="value">{sessionData.skill}</span>
          </div>
          
          <div className="info-row">
            <span className="label">With:</span>
            <span className="value">{sessionData.partner.name}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Date:</span>
            <span className="value">
              {new Date(sessionData.dateTime).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Card>
      
      <RatingSystem 
        onChange={setRatings} 
        initialRatings={ratings}
      />
      {errors.ratings && <div className="error-message">{errors.ratings}</div>}
      
      <Card className="review-text">
        <h3>Your Review</h3>
        <Input
          type="textarea"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience and feedback about this session..."
          rows={5}
          error={errors.reviewText}
        />
      </Card>
      
      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;