// pages/ReviewRating.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RatingSystem from '../components/review/RatingSystem';
import ReviewForm from '../components/review/ReviewForm';

const ReviewRating = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({
    knowledge: 0,
    communication: 0,
    helpfulness: 0
  });
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would call your API service
        const response = await fetch(`/api/sessions/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to load session details');
        }
        const data = await response.json();
        setSession(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSessionDetails();
  }, [sessionId]);

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleReviewTextChange = (text) => {
    setReviewText(text);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call your API service
      const response = await fetch(`/api/sessions/${sessionId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ratings,
          reviewText
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      // Navigate back to session detail page
      navigate(`/sessions/${sessionId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading session details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!session) {
    return <div className="not-found">Session not found</div>;
  }

  return (
    <div className="review-rating-page">
      <h1>Leave a Review</h1>
      <div className="session-summary">
        <h2>Session with {session.partner.name}</h2>
        <p>Skill: {session.skill.name}</p>
        <p>Date: {new Date(session.date).toLocaleDateString()}</p>
      </div>
      
      <div className="review-container">
        <RatingSystem 
          ratings={ratings} 
          onRatingChange={handleRatingChange} 
        />
        
        <ReviewForm 
          reviewText={reviewText} 
          onReviewTextChange={handleReviewTextChange} 
        />
        
        <div className="review-actions">
          <button 
            className="cancel-button" 
            onClick={() => navigate(`/sessions/${sessionId}`)}
          >
            Cancel
          </button>
          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={isSubmitting || !ratings.knowledge || !ratings.communication || !ratings.helpfulness}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewRating;