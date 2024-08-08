import React from 'react';
import './Clues.css';

const clues = {
  across: {
    1: "The tip of a sippy cup, essentially",
    6: "It's considered to be both a percussion and stringed instrument",
    7: "Knight's attire",
    8: "More than just wants",
    9: "Circus safety feature",
  },
  down: {
    1: "Length of a bridge",
    2: '"Flat" or "spare" item',
    3: "Noodles eaten with chashu pork",
    4: "One end of a battery",
    5: "Superlative seen on a Razzie Award",
  },
};

const Clues = ({ selectedClue, onClueSelect }) => {
  const renderClueList = (direction) => (
    Object.entries(clues[direction]).map(([number, clue]) => (
      <p
        key={number}
        className={selectedClue?.number === Number(number) && selectedClue?.direction === direction ? 'selected' : ''}
        onClick={() => onClueSelect({ number: Number(number), direction })}
      >
        {number}. {clue}
      </p>
    ))
  );

  return (
    <div className="clues">
      <div className="across">
        <h3>Across</h3>
        {renderClueList('across')}
      </div>
      <div className="down">
        <h3>Down</h3>
        {renderClueList('down')}
      </div>
    </div>
  );
};

export default Clues;
