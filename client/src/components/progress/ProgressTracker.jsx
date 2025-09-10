import React from 'react';
import { useSelector } from 'react-redux';

function ProgressTracker() {
  const { assignments } = useSelector((state) => state.assignments);
  
  const total = assignments.length;
  const completed = assignments.filter(a => a.status === 'completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <span>Overall Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-stats">
        <span>{completed} completed</span>
        <span>{total - completed} remaining</span>
      </div>
    </div>
  );
}

export default ProgressTracker;