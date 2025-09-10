import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, stopTimer, togglePause, tick, setSessionType } from '../../store/slices/timerSlice';
import { formatSeconds } from '../../utils/dateHelpers';

function PomodoroTimer() {
  const dispatch = useDispatch();
  const { 
    isRunning, 
    isPaused, 
    timeRemaining, 
    sessionType,
    currentSession 
  } = useSelector((state) => state.timer);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, dispatch]);

  const handleStart = () => {
    dispatch(startTimer({ sessionType, duration: timeRemaining }));
  };

  const handleStop = () => {
    if (currentSession) {
      dispatch(stopTimer(currentSession.id));
    }
  };

  const handlePause = () => {
    dispatch(togglePause());
  };

  const handleSessionChange = (type) => {
    dispatch(setSessionType(type));
  };

  return (
    <div className="timer-container">
      <div className="timer-mode-selector">
        <button 
          className={`mode-btn ${sessionType === 'pomodoro' ? 'active' : ''}`}
          onClick={() => handleSessionChange('pomodoro')}
        >
          Pomodoro
        </button>
        <button 
          className={`mode-btn ${sessionType === 'shortBreak' ? 'active' : ''}`}
          onClick={() => handleSessionChange('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`mode-btn ${sessionType === 'longBreak' ? 'active' : ''}`}
          onClick={() => handleSessionChange('longBreak')}
        >
          Long Break
        </button>
      </div>

      <div className="timer-display">
        {formatSeconds(timeRemaining)}
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="timer-btn primary" onClick={handleStart}>
            START
          </button>
        ) : (
          <>
            <button className="timer-btn" onClick={handlePause}>
              {isPaused ? 'RESUME' : 'PAUSE'}
            </button>
            <button className="timer-btn" onClick={handleStop}>
              STOP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PomodoroTimer;