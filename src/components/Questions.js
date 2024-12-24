

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { Button } from 'antd';

const questions = [
  {
    question: 'Which of the following is used to pass data to components in React?',
    options: ['State', 'setState', 'Props'],
    answer: 'Props',
  },
  {
    question: 'Which hook is used to handle state in a functional component?',
    options: ['useEffect', 'useContext', 'useState'],
    answer: 'useState',
  },
  {
    question: 'What does JSX stand for?',
    options: [' JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension'],
    answer: 'JavaScript XML',
  },
  {
    question: 'Which hook would you use to run code after a component renders?',
    options: ['useEffect', 'useContext', 'useState'],
    answer: 'useEffect',
  },
  {
    question: 'React is mainly used for building which part of an application?',
    options: ['Database', 'User Interface', 'Backend'],
    answer: 'User Interface',
  },
  {
    question: 'What is the default command to start a React app?',
    options: ['npm start', 'npm run start', 'npm serve'],
    answer: 'npm start',
  },
  {
    question: 'React is a library for which programming language?',
    options: ['Python', 'Ruby', 'JavaScript'],
    answer: 'JavaScript',
  },
  {
    question: 'What is the correct syntax to include an inline style in JSX?',
    options: ['<div style="color: red;"></div>', ' <div style={{color: "red"}}></div> ', ' <div style={color: red}></div>'],
    answer: '<div style={{color: "red"}}></div>',
  },
  {
    question: 'Which of the following keywords is used to create a constant in React?',
    options: ['var', 'let', 'const'],
    answer: 'const',
  },
  
];

function Questions() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username; 

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    const updatedScores = [...scores, isCorrect ? 1 : 0]; 
    setScores(updatedScores);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const calculateFinalScore = () => {
    return scores.reduce((acc, curr) => acc + curr, 0); 
  };

  const handleSubmitScore = async () => {
    const finalScore = calculateFinalScore();
    try {
      await axios.post('http://localhost:1000/scores', { name: username, score: finalScore });
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };
  useEffect(() => {
    if (showScore) {
      handleSubmitScore();
    }
  }, [showScore]);
  const handleFinish = () => {
    navigate('/');
  }
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <div className='score' >Aapka naam: {username}</div>
          <div className='score' >Aapka score: {calculateFinalScore()} / {questions.length}</div>
          <Button className='score-btn' onClick={handleFinish}  >Complete</Button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question">
            {questions[currentQuestion].question}
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <Button onClick={() => handleAnswerOptionClick(option)}>
                  {option}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Questions;
