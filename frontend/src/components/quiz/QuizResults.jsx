// components/quiz/QuizResults.jsx
import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const QuizResults = ({ results, quiz, onRetake }) => {
  const isPassed = results.percentage >= quiz.passingScore;
  
  return (
    <Card className="quiz-results">
      <div className={`results-header ${isPassed ? 'passed' : 'failed'}`}>
        <h2>{isPassed ? 'Congratulations!' : 'Nice Try!'}</h2>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-percentage">{results.percentage}%</span>
          </div>
          <p className="score-text">
            {isPassed 
              ? 'You passed the skill assessment!' 
              : `You need ${quiz.passingScore}% to pass.`}
          </p>
        </div>
      </div>
      
      <div className="results-details">
        <div className="detail-row">
          <span className="label">Correct Answers:</span>
          <span className="value">{results.correctAnswers} of {results.totalQuestions}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Time Taken:</span>
          <span className="value">{results.timeTaken} minutes</span>
        </div>
      </div>
      
      {results.certificateUrl && isPassed && (
        <div className="certificate-section">
          <h3>Your Skill Certificate</h3>
          <p>You've earned a certificate for this skill!</p>
          <Button 
            variant="primary" 
            as="a" 
            href={results.certificateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Certificate
          </Button>
        </div>
      )}
      
      <div className="results-feedback">
        <h3>Performance Summary</h3>
        {results.feedback.map((item, index) => (
          <div key={index} className="feedback-item">
            <h4>{item.category}</h4>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${item.score}%` }}
              />
            </div>
            <p>{item.comment}</p>
          </div>
        ))}
      </div>
      
      <div className="results-actions">
        {!isPassed && (
          <Button variant="secondary" onClick={onRetake}>
            Retake Quiz
          </Button>
        )}
        
        <Button variant="primary" as={Link} to="/skills">
          Explore More Skills
        </Button>
      </div>
    </Card>
  );
};

export default QuizResults;