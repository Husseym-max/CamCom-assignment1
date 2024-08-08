import React, { useMemo } from 'react';
import './Result.css';

const Result = ({ grid, clueMappings, clueAnswers }) => {
  // Memoized result calculations to avoid recalculations on every render
  const results = useMemo(() => {
    const computedResults = {};

    Object.entries(clueMappings).forEach(([direction, clues]) => {
      Object.values(clues).forEach(clue => {
        const clueNumber = clue.number;
        const correctAnswer = clueAnswers[direction][clueNumber] || '';
        const clueCells = clue.cells;
        const userAnswer = clueCells.map(([row, col]) => grid[row][col] || '').join('');
        const isCorrect = userAnswer === correctAnswer;

        computedResults[clueNumber] = {
          direction,
          userAnswer,
          correctAnswer,
          isCorrect,
        };
      });
    });

    return computedResults;
  }, [grid, clueMappings, clueAnswers]);

  // Function to render individual results
  const renderResult = ({ clueNumber, direction, userAnswer, correctAnswer, isCorrect }) => (
    <div key={clueNumber} className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
      <div>
        <strong>Clue {clueNumber} ({direction}):</strong>
      </div>
      <div>
        <strong>Input:</strong> {userAnswer}
      </div>
      <div>
        <strong>Answer:</strong> {correctAnswer}
      </div>
      <div className={`status ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? '✔ Correct' : '✘ Incorrect'}
      </div>
    </div>
  );

  // Render all results
  return (
    <div className="result-container">
      {Object.entries(results).map(([clueNumber, { direction, userAnswer, correctAnswer, isCorrect }]) =>
        renderResult({ clueNumber, direction, userAnswer, correctAnswer, isCorrect })
      )}
    </div>
  );
};

export default Result;
