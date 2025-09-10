import React from 'react';
import { useSelector } from 'react-redux';

function StreakCounter() {
  const { user } = useSelector((state) => state.auth);
  const streak = user?.stats?.currentStreak || 0;

  return (
    <div className="streak-counter">
      <div className="streak-value">{streak}</div>
      <div className="streak-label">Day Streak 🔥</div>
    </div>
  );
}

export default StreakCounter;