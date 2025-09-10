import React from 'react';
import { useSelector } from 'react-redux';
import { formatSeconds } from '../../utils/dateHelpers';

function TimerWidget() {
  const { timeRemaining, sessionType, isRunning } = useSelector(
    (state) => state.timer
  );

  return (
    <div className="timer-widget">
      <div className="timer-label">
        {sessionType === 'pomodoro' ? 'Focus Time' : 'Break Time'}
      </div>
      <div className="timer-display-small">
        {formatSeconds(timeRemaining)}
      </div>
      {isRunning && (
        <div className="timer-status">Timer Running</div>
      )}
    </div>
  );
}

export default TimerWidget;