import React, { useState } from 'react';
import Grid from './components/Grid';
import Clues from './components/Clues';
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';
import './App.css';

// Clue mappings and answers (same as before)
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

// Example clue answers (same as before)
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

function App() {
  const [selectedClue, setSelectedClue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [grid, setGrid] = useState([
    ['1', '2', '3', '4', ''],
    ['5', '', '', '', '6'],
    ['7', '', '', '', ''],
    ['8', '', '', '', ''],
    ['9', '', '', '', ''],
  ]);
  const [results, setResults] = useState([]);

  const handleCellClick = (row, col) => {
    const clueNumber = getClueNumber(row, col);
    const direction = getClueDirection(row, col);
    setSelectedClue({ number: clueNumber, direction });
  };

  const handleClueSelect = (clue) => {
    setSelectedClue(clue);
  };

  const getClueNumber = (row, col) => {
    for (const direction in clueMappings) {
      for (const clue in clueMappings[direction]) {
        if (clueMappings[direction][clue].cells.some(([r, c]) => r === row && c === col)) {
          return clueMappings[direction][clue].number;
        }
      }
    }
    return null;
  };

  const getClueDirection = (row, col) => {
    for (const [direction, clues] of Object.entries(clueMappings)) {
      for (const { cells } of Object.values(clues)) {
        if (cells.some(([r, c]) => r === row && c === col)) {
          return direction;
        }
      }
    }
    return null;
  };

  return (
    <>
      <div className="App">
        <Navbar />
        <Grid 
          selectedClue={selectedClue} 
          onCellClick={handleCellClick} 
          grid={grid} 
          setGrid={setGrid} 
          setResults={setResults}
          results={results}
        />
        <Clues selectedClue={selectedClue} onClueSelect={handleClueSelect} />
        <SettingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}

export default App;
