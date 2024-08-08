import React from 'react';
import './Cell.css';

const Cell = ({ value, row, col, onChange, onClick, isHighlighted, isPreFilled }) => {
  return (
    <div
      className={`cell ${isHighlighted ? 'highlighted' : ''} ${isPreFilled ? 'pre-filled' : ''}`}
      onClick={onClick}
    >
      <input
        className="cell-input"
        type="text"
        maxLength="1"
        value={value}
        onChange={(e) => onChange(e.target.value, row, col)}
        readOnly={isPreFilled}
      />
    </div>
  );
};

export default Cell;
