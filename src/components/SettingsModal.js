import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const SettingsModal = ({ isOpen, onClose }) => {
  const [arrowKeyDirection, setArrowKeyDirection] = useState('stay');
  const [spacebarAction, setSpacebarAction] = useState('clearAndAdvance');
  const [toggleBetween, setToggleBetween] = useState('across');
  const [backspaceBehavior, setBackspaceBehavior] = useState({
    startOfWord: 'backspacePrevious',
    withinWord: 'skipFilledSquares',
    endOfWord: 'jumpBackToFirst'
  });
  const [interactions, setInteractions] = useState({
    playSoundOnSolve: false,
    showTimer: false,
    suppressWarnings: false,
    showMilestones: false
  });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Puzzle Settings</h2>
        <div>
          <h3>Arrow Key Direction:</h3>
          <label>
            <input
              type="radio"
              value="stay"
              checked={arrowKeyDirection === 'stay'}
              onChange={(e) => setArrowKeyDirection(e.target.value)}
            />
            Stay in the same square
          </label>
          <label>
            <input
              type="radio"
              value="move"
              checked={arrowKeyDirection === 'move'}
              onChange={(e) => setArrowKeyDirection(e.target.value)}
            />
            Move in the direction of the arrow
          </label>
        </div>

        <div>
          <h3>Spacebar Action:</h3>
          <label>
            <input
              type="radio"
              value="clearAndAdvance"
              checked={spacebarAction === 'clearAndAdvance'}
              onChange={(e) => setSpacebarAction(e.target.value)}
            />
            Clear the current square and advance
          </label>
        </div>

        <div>
          <h3>Toggle Between:</h3>
          <label>
            <input
              type="radio"
              value="across"
              checked={toggleBetween === 'across'}
              onChange={(e) => setToggleBetween(e.target.value)}
            />
            Across
          </label>
          <label>
            <input
              type="radio"
              value="down"
              checked={toggleBetween === 'down'}
              onChange={(e) => setToggleBetween(e.target.value)}
            />
            Down
          </label>
        </div>

        <div>
          <h3>Backspace Behavior:</h3>
          <div>
            <h4>At the start of a word:</h4>
            <label>
              <input
                type="radio"
                value="backspacePrevious"
                checked={backspaceBehavior.startOfWord === 'backspacePrevious'}
                onChange={(e) => setBackspaceBehavior(prev => ({ ...prev, startOfWord: e.target.value }))}
              />
              Backspace into previous word
            </label>
          </div>
          <div>
            <h4>Within a word:</h4>
            <label>
              <input
                type="radio"
                value="skipFilledSquares"
                checked={backspaceBehavior.withinWord === 'skipFilledSquares'}
                onChange={(e) => setBackspaceBehavior(prev => ({ ...prev, withinWord: e.target.value }))}
              />
              Skip over filled squares
            </label>
            <label>
              <input
                type="radio"
                value="skipPenciledIn"
                checked={backspaceBehavior.withinWord === 'skipPenciledIn'}
                onChange={(e) => setBackspaceBehavior(prev => ({ ...prev, withinWord: e.target.value }))}
              />
              Even penciled-in squares
            </label>
          </div>
          <div>
            <h4>At the end of a word:</h4>
            <label>
              <input
                type="radio"
                value="jumpBackToFirst"
                checked={backspaceBehavior.endOfWord === 'jumpBackToFirst'}
                onChange={(e) => setBackspaceBehavior(prev => ({ ...prev, endOfWord: e.target.value }))}
              />
              Jump back to first blank in the word
            </label>
            <label>
              <input
                type="radio"
                value="jumpToNextClue"
                checked={backspaceBehavior.endOfWord === 'jumpToNextClue'}
                onChange={(e) => setBackspaceBehavior(prev => ({ ...prev, endOfWord: e.target.value }))}
              />
              Jump to next clue (if not jumping back)
            </label>
          </div>
        </div>

        <div>
          <h3>Interactions:</h3>
          <label>
            <input
              type="checkbox"
              checked={interactions.playSoundOnSolve}
              onChange={(e) => setInteractions(prev => ({ ...prev, playSoundOnSolve: e.target.checked }))}
            />
            Play sound on solve
          </label>
          <label>
            <input
              type="checkbox"
              checked={interactions.showTimer}
              onChange={(e) => setInteractions(prev => ({ ...prev, showTimer: e.target.checked }))}
            />
            Show timer
          </label>
          <label>
            <input
              type="checkbox"
              checked={interactions.suppressWarnings}
              onChange={(e) => setInteractions(prev => ({ ...prev, suppressWarnings: e.target.checked }))}
            />
            Suppress disqualification warnings
          </label>
          <label>
            <input
              type="checkbox"
              checked={interactions.showMilestones}
              onChange={(e) => setInteractions(prev => ({ ...prev, showMilestones: e.target.checked }))}
            />
            Show puzzle milestones
          </label>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Save and close</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;
