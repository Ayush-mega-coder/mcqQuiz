import React, { useState, useEffect } from "react";
import axios from "axios";

interface Question {
  question: string;
  options: string[];
  duration: number;
}

const TakeExam: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // Fetch questions from backend API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>("http://localhost:8000/api/questions");
        setQuestions(response.data);
        // Set the duration of the first question when it's fetched
        setTimeLeft(response.data[0]?.duration || 0);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Timer function
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    // Clear the timer when timeLeft reaches 0 or when the current question changes
    // if (timeLeft === 0 || currentQuestionIndex >= questions.length - 1) {
    //   clearInterval(timer);
    // }
  }, [timeLeft, currentQuestionIndex, questions]);

  const handleNextQuestion = () => {
    // Move to the next question and reset the timer
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption(null);
    setTimeLeft(questions[currentQuestionIndex + 1]?.duration || 0);
  };

  const handleOptionChange = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  return (
    <div>
      <h1>Question {currentQuestionIndex + 1}</h1>
      <p>{questions[currentQuestionIndex]?.question}</p>
      {questions[currentQuestionIndex]?.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            value={index}
            checked={selectedOption === index}
            onChange={() => handleOptionChange(index)}
          />
          <label>{option}</label>
        </div>
      ))}
      <p>Time left: {timeLeft} seconds</p>
      {timeLeft === 0 || currentQuestionIndex === questions.length - 1 ? (
        <button disabled>Submit</button>
      ) : (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
    </div>
  );
};

export default TakeExam;
