// Quiz.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const [bookmarkedWords, setBookmarkedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [seenWords, setSeenWords] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Fetch bookmarked words from local storage
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarkedWords(savedBookmarks);

    if (savedBookmarks.length > 0) {
      pickRandomWord(savedBookmarks, []);
    } else {
      setGameOver(true); // End the game if no bookmarked words are available
    }
  }, []);

  const pickRandomWord = (words, seenWords) => {
    // Filter words to exclude ones that have already been seen
    const remainingWords = words.filter(word => !seenWords.includes(word));

    if (remainingWords.length > 0) {
      const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
      fetchDefinition(randomWord);
    } else {
      setGameOver(true);
      setCurrentWord(null);
    }
  };

  const fetchDefinition = async (word) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    if (data && data[0]) {
      const randomMeaning = data[0].meanings[0].definitions[0];
      setCurrentWord({ word, definition: randomMeaning.definition });
    }
  };

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (currentWord && userAnswer.toLowerCase() === currentWord.word.toLowerCase()) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! The correct word was "${currentWord.word}".`);
    }
    setUserAnswer('');

    // Add the current word to seen words and pick a new word
    const newSeenWords = [...seenWords, currentWord.word];
    setSeenWords(newSeenWords);
    pickRandomWord(bookmarkedWords, newSeenWords);
  };

  const handleRestart = () => {
    setSeenWords([]);
    setScore(0);
    setFeedback('');
    setGameOver(false);
    pickRandomWord(bookmarkedWords, []);
  };

  return (
    <div className="app-container">
      <div className="quiz-container container mt-5">
        <div>
          <h1 className="text-center">Word Quiz</h1>
        </div>
        <div style={{ marginTop: 10, marginBottom: 20 }} className="text-center mt-4">
          <img src={"https://cdn-icons-png.flaticon.com/512/5726/5726532.png"} alt="Logo" width="150" height="150" />
        </div>
        <p className="text-center">Test your knowledge of your bookmarked words!</p>
        <p className="text-center"><strong>Score: {score}</strong></p>

        {bookmarkedWords.length === 0 ? (
          // Message when there are no bookmarked words at all
          <p className="text-center mt-4">No bookmarked words available. Please bookmark words to start the quiz.</p>
        ) : gameOver ? (
          // Message after all words have been seen
          <div className="text-center mt-4">
            <h2>You've seen all bookmarked words!</h2>
            <p>Your final score is: {score}</p>
            <button className="btn btn-primary mt-3" onClick={handleRestart}>Restart Quiz</button>
          </div>
        ) : currentWord ? (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Guess the word:</h5>
              <p className="card-text"><strong>Definition:</strong> {currentWord.definition}</p>

              <input
                type="text"
                className="form-control mt-3"
                value={userAnswer}
                onChange={handleAnswerChange}
                placeholder="Type your answer"
              />
              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
              </div>

              {feedback && <p className="mt-3">{feedback}</p>}
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">Loading next question...</p>
        )}

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-secondary">Back to Dictionary</Link>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
