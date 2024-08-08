import React, { useState } from 'react';
import Grid from './Grid';
import Clues from './Clues';
import './Crossword.css';

const Crossword = () => {
  const [selectedClue, setSelectedClue] = useState(null);

  const handleClueClick = (number, direction) => {
    setSelectedClue({ number, direction });
  };

  return (
    <div className="crossword">
      <Grid selectedClue={selectedClue} />
      <Clues onClueClick={handleClueClick} />
    </div>
  );
};

export default Crossword;
