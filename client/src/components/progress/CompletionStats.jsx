import React from 'react';
import { useSelector } from 'react-redux';

function CompletionStats() {
  const { assignments } = useSelector((state) => state.assignments);
  
  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => a.status === 'completed').length,
    pending: assignments.filter(a => a.status === 'pending').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
  };

  return (
    <div className="completion-stats">
      <h3>Completion Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item success">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item warning">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-item danger">
          <div className="stat-value">{stats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>
    </div>
  );
}

export default CompletionStats;