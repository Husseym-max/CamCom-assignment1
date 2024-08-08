import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onClear, onReveal, onCheck }) => {
  const [time, setTime] = useState(0); // Track time in seconds
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Initialize settings state from local storage or default values
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('puzzleSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      arrowKeyDirection: 'stay',
      spacebarAction: 'clearAndAdvance',
      toggleBetween: 'across',
      backspaceBehavior: {
        startOfWord: 'backspacePrevious',
        withinWord: 'skipFilledSquares',
        endOfWord: 'jumpBackToFirst',
      },
      interactions: {
        playSoundOnSolve: false,
        showTimer: false,
        suppressWarnings: false,
        showMilestones: false,
      },
    };
  });

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000); // Elapsed time in seconds
      setTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleSettingChange = (settingType, value) => {
    setSettings(prevSettings => {
      const updatedSettings = {
        ...prevSettings,
        [settingType]: value
      };
      localStorage.setItem('puzzleSettings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  const handleBackspaceBehaviorChange = (type, value) => {
    setSettings(prevSettings => {
      const updatedBehavior = {
        ...prevSettings.backspaceBehavior,
        [type]: value
      };
      const updatedSettings = {
        ...prevSettings,
        backspaceBehavior: updatedBehavior
      };
      localStorage.setItem('puzzleSettings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  const handleInteractionsChange = (key, value) => {
    setSettings(prevSettings => {
      const updatedInteractions = {
        ...prevSettings.interactions,
        [key]: value
      };
      const updatedSettings = {
        ...prevSettings,
        interactions: updatedInteractions
      };
      localStorage.setItem('puzzleSettings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  const saveAndClose = () => {
    localStorage.setItem('puzzleSettings', JSON.stringify(settings));
    setIsMenuVisible(false);
  };

  return (
    <header className="navbar">
      <nav className="nav-items">
        <ul>
          <li className="nav-item">
            <button className="settings-button" onClick={toggleMenu}>
              <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="Settings" />
            </button>
            {isMenuVisible && (
              <div className="settings-menu">
                <ul>
                  <li>
                    <h3>Arrow Key Direction:</h3>
                    <label>
                      <input
                        type="radio"
                        name="arrowKeyDirection"
                        checked={settings.arrowKeyDirection === 'stay'}
                        onChange={() => handleSettingChange('arrowKeyDirection', 'stay')}
                      />
                      Stay in the same square
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="arrowKeyDirection"
                        checked={settings.arrowKeyDirection === 'move'}
                        onChange={() => handleSettingChange('arrowKeyDirection', 'move')}
                      />
                      Move in the direction of the arrow
                    </label>
                  </li>
                  <li>
                    <h3>Spacebar Action:</h3>
                    <label>
                      <input
                        type="radio"
                        name="spacebarAction"
                        checked={settings.spacebarAction === 'clearAndAdvance'}
                        onChange={() => handleSettingChange('spacebarAction', 'clearAndAdvance')}
                      />
                      Clear the current square and advance
                    </label>
                  </li>
                  <li>
                    <h3>Toggle Between:</h3>
                    <label>
                      <input
                        type="radio"
                        name="toggleBetween"
                        checked={settings.toggleBetween === 'across'}
                        onChange={() => handleSettingChange('toggleBetween', 'across')}
                      />
                      Across
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="toggleBetween"
                        checked={settings.toggleBetween === 'down'}
                        onChange={() => handleSettingChange('toggleBetween', 'down')}
                      />
                      Down
                    </label>
                  </li>
                  <li>
                    <h3>Backspace Behavior:</h3>
                    <div>
                      <h4>At the start of a word:</h4>
                      <label>
                        <input
                          type="radio"
                          name="startOfWord"
                          checked={settings.backspaceBehavior.startOfWord === 'backspacePrevious'}
                          onChange={() => handleBackspaceBehaviorChange('startOfWord', 'backspacePrevious')}
                        />
                        Backspace into previous word
                      </label>
                    </div>
                    <div>
                      <h4>Within a word:</h4>
                      <label>
                        <input
                          type="radio"
                          name="withinWord"
                          checked={settings.backspaceBehavior.withinWord === 'skipFilledSquares'}
                          onChange={() => handleBackspaceBehaviorChange('withinWord', 'skipFilledSquares')}
                        />
                        Skip over filled squares
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="withinWord"
                          checked={settings.backspaceBehavior.withinWord === 'skipPenciledIn'}
                          onChange={() => handleBackspaceBehaviorChange('withinWord', 'skipPenciledIn')}
                        />
                        Even penciled-in squares
                      </label>
                    </div>
                    <div>
                      <h4>At the end of a word:</h4>
                      <label>
                        <input
                          type="radio"
                          name="endOfWord"
                          checked={settings.backspaceBehavior.endOfWord === 'jumpBackToFirst'}
                          onChange={() => handleBackspaceBehaviorChange('endOfWord', 'jumpBackToFirst')}
                        />
                        Jump back to first blank in the word
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="endOfWord"
                          checked={settings.backspaceBehavior.endOfWord === 'jumpToNextClue'}
                          onChange={() => handleBackspaceBehaviorChange('endOfWord', 'jumpToNextClue')}
                        />
                        Jump to next clue (if not jumping back)
                      </label>
                    </div>
                  </li>
                  <li>
                    <h3>Interactions:</h3>
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.interactions.playSoundOnSolve}
                        onChange={(e) => handleInteractionsChange('playSoundOnSolve', e.target.checked)}
                      />
                      Play sound on solve
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.interactions.showTimer}
                        onChange={(e) => handleInteractionsChange('showTimer', e.target.checked)}
                      />
                      Show timer
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.interactions.suppressWarnings}
                        onChange={(e) => handleInteractionsChange('suppressWarnings', e.target.checked)}
                      />
                      Suppress disqualification warnings
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={settings.interactions.showMilestones}
                        onChange={(e) => handleInteractionsChange('showMilestones', e.target.checked)}
                      />
                      Show puzzle milestones
                    </label>
                  </li>
                  <li>
                    <button onClick={saveAndClose}>
                      Save and close
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="nav-item"><span id="time-item">{formatTime(time)}</span></li>
          <li className="nav-item"><button className="nav-button" onClick={onClear}>Clear</button></li>
          <li className="nav-item"><button className="nav-button" onClick={onReveal}>Reveal</button></li>
          <li className="nav-item"><button className="nav-button" onClick={onCheck}>Check</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
