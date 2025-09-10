import React from 'react';
import { formatMinutes } from '../../utils/dateHelpers';

function TimerHistory({ sessions = [] }) {
  if (sessions.length === 0) {
    return (
      <div className="timer-history empty">
        <p>No timer sessions yet</p>
      </div>
    );
  }

  return (
    <div className="timer-history">
      <h3>Recent Sessions</h3>
      <div className="history-list">
        {sessions.map((session) => (
          <div key={session.id} className="history-item">
            <div className="session-info">
              <span className="session-type">
                {session.sessionType === 'pomodoro' ? '🍅' : '☕'}
              </span>
              <span className="session-duration">
                {formatMinutes(Math.floor(session.duration / 60))}
              </span>
            </div>
            <span className="session-time">
              {new Date(session.endTime).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimerHistory;