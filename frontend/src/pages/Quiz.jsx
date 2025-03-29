// pages/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizInstructions from '../components/quiz/QuizInstructions';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizTimer from '../components/quiz/QuizTimer';
import QuizResults from '../components/quiz/QuizResults';

const Quiz = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizState, setQuizState] = useState('instructions'); // 'instructions', 'in-progress', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [results, setResults] = useState(null);
  
  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would call your API service
        const response = await fetch(`/api/skills/${skillId}/quiz`);
        if (!response.ok) {
          throw new Error('Failed to load quiz');
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuiz();
  }, [skillId]);
  
  const handleStartQuiz = () => {
    setQuizState('in-progress');
    setStartTime(new Date());
  };
  
  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };
  
  const handleTimeUp = () => {
    submitQuiz();
  };
  
  const submitQuiz = async () => {
    try {
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 60000; // Convert to minutes
      
      // In a real app, this would call your API service
      const response = await fetch(`/api/skills/${skillId}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answers,
          timeTaken
        })
      });
      
      const resultData = await response.json();
      setResults(resultData);
      setQuizState('results');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  
  const handleRetakeQuiz = () => {
    setQuizState('instructions');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };
  
  if (isLoading) {
    return <div className="loading">Loading quiz...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (!quiz) {
    return <div className="not-found">Quiz not found</div>;
  }
  
  return (
    <div className="quiz-page">
      {quizState === 'instructions' && (
        <QuizInstructions quiz={quiz} onStartQuiz={handleStartQuiz} />
      )}
      
      {quizState === 'in-progress' && (
        <div className="quiz-container">
          <div className="quiz-header">
            <h2>{quiz.title} Assessment</h2>
            <QuizTimer 
              durationInMinutes={quiz.duration} 
              onTimeUp={handleTimeUp} 
            />
          </div>
          
          <QuizQuestion 
           
            question={quiz.questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quiz.questions.length}
            selectedAnswer={answers[quiz.questions[currentQuestionIndex].id]}
            onAnswerSelect={(answerId) => handleAnswerSelect(quiz.questions[currentQuestionIndex].id, answerId)}
          />
          
          <div className="quiz-navigation">
            <button 
              className="next-button" 
              onClick={handleNextQuestion}
              disabled={!answers[quiz.questions[currentQuestionIndex].id]}
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Submit Quiz"}
            </button>
          </div>
        </div>
      )}
      
      {quizState === 'results' && (
        <QuizResults 
          results={results}
          quiz={quiz}
          onRetakeQuiz={handleRetakeQuiz}
          onFinish={() => navigate(`/skills/${skillId}`)}
        />
      )}
    </div>
  );
};

export default Quiz;