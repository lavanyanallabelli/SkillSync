// components/review/RatingSystem.jsx
import React, { useState } from 'react';
import Card from '../common/Card';

const RatingSystem = ({ initialRatings = {}, onChange }) => {
  const [ratings, setRatings] = useState({
    knowledge: initialRatings.knowledge || 0,
    communication: initialRatings.communication || 0,
    helpfulness: initialRatings.helpfulness || 0,
    overall: initialRatings.overall || 0
  });
  
  const handleRatingChange = (category, value) => {
    const newRatings = {
      ...ratings,
      [category]: value
    };
    
    // Automatically calculate the overall rating as average of others
    if (category !== 'overall') {
      const { knowledge, communication, helpfulness } = newRatings;
      newRatings.overall = Math.round(
        (knowledge + communication + helpfulness) / 3
      );
    }
    
    setRatings(newRatings);
    onChange(newRatings);
  };
  
  const renderStars = (category, currentRating) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-button ${star <= currentRating ? 'filled' : 'empty'}`}
            onClick={() => handleRatingChange(category, star)}
            aria-label={`Rate ${star} out of 5`}
          >
            <i className="material-icons">
              {star <= currentRating ? 'star' : 'star_border'}
            </i>
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <Card className="rating-system">
      <h3>Rate your experience</h3>
      
      <div className="rating-categories">
        <div className="rating-category">
          <label>Knowledge</label>
          {renderStars('knowledge', ratings.knowledge)}
        </div>
        
        <div className="rating-category">
          <label>Communication</label>
          {renderStars('communication', ratings.communication)}
        </div>
        
        <div className="rating-category">
          <label>Helpfulness</label>
          {renderStars('helpfulness', ratings.helpfulness)}
        </div>
      </div>
      
      <div className="overall-rating">
        <label>Overall Rating</label>
        <div className="overall-stars">
          {renderStars('overall', ratings.overall)}
          <span className="rating-value">{ratings.overall} of 5</span>
        </div>
      </div>
    </Card>
  );
};

export default RatingSystem;