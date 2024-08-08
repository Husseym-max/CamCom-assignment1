import React from 'react';
import Cell from './Cell';
import './Cell.css';

const clueMappings = {
  across: {
    1: { number: 1, start: [0, 0], cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] },
    6: { number: 6, start: [1, 0], cells: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]] },
    7: { number: 7, start: [2, 0], cells: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]] },
    8: { number: 8, start: [3, 0], cells: [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]] },
    9: { number: 9, start: [4, 0], cells: [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]] }
  },
  down: {
    1: { number: 1, start: [0, 0], cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] },
    2: { number: 2, start: [0, 1], cells: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]] },
    3: { number: 3, start: [0, 2], cells: [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]] },
    4: { number: 4, start: [0, 3], cells: [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]] },
    5: { number: 5, start: [0, 4], cells: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]] }
  }
};

const clueAnswers = {
  across: {
    1: 'STRAW',
    6: 'PIANO',
    7: 'ARMOR',
    8: 'SEEKS',
    9: 'MAT'
  },
  down: {
    1: 'SPAS',
    2: 'TIRE',
    3: 'RAMEN',
    4: 'ANODE',
    5: 'WORST'
  }
};

const Grid = ({ selectedClue, onCellClick, grid, setGrid, setResults, results }) => {
  const handleChange = (value, row, col) => {
    const newGrid = grid.map((r, rowIndex) => (
      r.map((c, colIndex) => (
        rowIndex === row && colIndex === col ? value : c
      ))
    ));
    setGrid(newGrid);
    updateResults(newGrid); // Update results when grid changes
  };

  const updateResults = (newGrid) => {
    const newResults = [];
    for (const direction in clueMappings) {
      for (const clue of Object.values(clueMappings[direction])) {
        const { number, cells } = clue;
        const clueAnswer = clueAnswers[direction][number];
        cells.forEach(([r, c], index) => {
          if (newGrid[r][c] !== clueAnswer[index]) {
            newResults.push({ row: r, col: c, isCorrect: false });
          } else {
            newResults.push({ row: r, col: c, isCorrect: true });
          }
        });
      }
    }
    setResults(newResults);
  };

  const isHighlighted = (row, col) => {
    if (!selectedClue) return false;
    const clueCells = clueMappings[selectedClue.direction][selectedClue.number].cells;
    return clueCells.some(([clueRow, clueCol]) => row === clueRow && col === clueCol);
  };

  const isCorrect = (row, col) => {
    return results.some(result => result.row === row && result.col === col && result.isCorrect);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              row={rowIndex}
              col={colIndex}
              onChange={handleChange}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              isPreFilled={cell !== ''}
              isCorrect={isCorrect(rowIndex, colIndex)} // Pass the correctness of the cell
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
