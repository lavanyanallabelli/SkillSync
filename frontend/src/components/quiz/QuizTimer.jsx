// components/quiz/QuizTimer.jsx
import React, { useState, useEffect } from 'react';

const QuizTimer = ({ durationInMinutes, onTimeUp }) => {
  // Convert minutes to seconds
  const [timeRemaining, setTimeRemaining] = useState(durationInMinutes * 60);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onTimeUp, durationInMinutes]);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const getTimerClass = () => {
    if (timeRemaining <= 60) {
      return 'timer-critical';
    } else if (timeRemaining <= 300) {
      return 'timer-warning';
    }
    return '';
  };
  
  return (
    <div className={`quiz-timer ${getTimerClass()}`}>
      <i className="material-icons timer-icon">access_time</i>
      <span className="timer-text">{formatTime(timeRemaining)}</span>
    </div>
  );
};

export default QuizTimer;