// components/quiz/QuizQuestion.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const QuizQuestion = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  onAnswerSelect,
  onNext,
  selectedAnswer
}) => {
  const handleOptionSelect = (optionId) => {
    onAnswerSelect(question.id, optionId);
  };
  
  return (
    <Card className="quiz-question">
      <div className="question-header">
        <span className="question-counter">
          Question {questionNumber} of {totalQuestions}
        </span>
        
        <div className="question-type-tag">
          {question.type === 'multiple_choice' && 'Multiple Choice'}
          {question.type === 'true_false' && 'True/False'}
          {question.type === 'code_snippet' && 'Code Evaluation'}
        </div>
      </div>
      
      <div className="question-content">
        <h3>{question.text}</h3>
        
        {question.codeSnippet && (
          <pre className="code-snippet">
            <code>{question.codeSnippet}</code>
          </pre>
        )}
        
        {question.image && (
          <img src={question.image} alt="Question visual" className="question-image" />
        )}
      </div>
      
      <div className="question-options">
        {question.type === 'true_false' ? (
          <div className="true-false-options">
            <button
              className={`option ${selectedAnswer === 'true' ? 'selected' : ''}`}
              onClick={() => handleOptionSelect('true')}
            >
              True
            </button>
            <button
              className={`option ${selectedAnswer === 'false' ? 'selected' : ''}`}
              onClick={() => handleOptionSelect('false')}
            >
              False
            </button>
          </div>
        ) : (
          <ul className="options-list">
            {question.options.map((option) => (
              <li 
                key={option.id} 
                className={`option ${selectedAnswer === option.id ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option.id)}
              >
                {option.text}
                {option.codeSnippet && (
                  <pre className="option-code-snippet">
                    <code>{option.codeSnippet}</code>
                  </pre>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="question-actions">
        <Button 
          variant="primary" 
          onClick={onNext}
          disabled={!selectedAnswer}
        >
          {questionNumber === totalQuestions ? 'Submit Quiz' : 'Next Question'}
        </Button>
      </div>
    </Card>
  );
};

export default QuizQuestion;