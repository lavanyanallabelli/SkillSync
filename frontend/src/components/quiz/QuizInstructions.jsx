// components/quiz/QuizInstructions.jsx
import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const QuizInstructions = ({ quiz, onStartQuiz }) => {
  return (
    <Card className="quiz-instructions">
      <h2>{quiz.title} Skill Assessment</h2>
      
      <div className="quiz-details">
        <div className="detail-row">
          <span className="label">Duration:</span>
          <span className="value">{quiz.duration} minutes</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Questions:</span>
          <span className="value">{quiz.totalQuestions} questions</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Passing Score:</span>
          <span className="value">{quiz.passingScore}%</span>
        </div>
      </div>
      
      <div className="instructions-content">
        <h3>Instructions:</h3>
        <ul>
          {quiz.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
      
      <div className="quiz-start">
        <p className="disclaimer">
          Once you start the quiz, the timer will begin and you must complete all questions within the allotted time.
        </p>
        
        <Button variant="primary" onClick={onStartQuiz} className="start-button">
          Start Quiz
        </Button>
      </div>
    </Card>
  );
};

export default QuizInstructions;