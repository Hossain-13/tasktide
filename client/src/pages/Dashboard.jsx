// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAssignments } from '../store/slices/assignmentSlice';
import { logout } from '../store/slices/authSlice';
import { startTimer, pauseTimer, resetTimer } from '../store/slices/timerSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignments, loading: assignmentsLoading } = useSelector((state) => state.assignments);
  const { user } = useSelector((state) => state.auth);
  const { timeLeft, isRunning } = useSelector((state) => state.timer);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  // Calculate stats
  const todayAssignments = assignments.filter(a => {
    const today = new Date().toDateString();
    return new Date(a.dueDate).toDateString() === today;
  });

  const completedAssignments = assignments.filter(a => a.status === 'completed');
  const overdueAssignments = assignments.filter(a => {
    const today = new Date();
    const dueDate = new Date(a.dueDate);
    return dueDate < today && a.status !== 'completed';
  });

  const upcomingAssignments = assignments
    .filter(a => a.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleTimerStart = () => {
    dispatch(startTimer());
  };

  const handleTimerPause = () => {
    dispatch(pauseTimer());
  };

  const handleTimerReset = () => {
    dispatch(resetTimer());
  };

  const handleCreateAssignment = () => {
    navigate('/assignments');
  };

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Student'}! 🌊</h1>
        <p>
          {todayAssignments.length === 0 
            ? "No tasks due today - great job staying ahead!" 
            : `You have ${todayAssignments.length} task${todayAssignments.length === 1 ? '' : 's'} due today`
          }
        </p>
        <button 
          onClick={handleLogout}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{assignments.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{todayAssignments.length}</div>
          <div className="stat-label">Due Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completedAssignments.length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user?.stats?.currentStreak || 0}</div>
          <div className="stat-label">Day Streak 🔥</div>
        </div>
      </div>

      {/* Dashboard Main Content */}
      <div className="dashboard-main">
        {/* Main Content */}
        <div className="main-content">
          {/* Upcoming Assignments */}
          <section>
            <h2>Upcoming Assignments</h2>
            {assignmentsLoading ? (
              <p>Loading assignments...</p>
            ) : upcomingAssignments.length > 0 ? (
              <div className="assignments-list">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={assignment.id || index} className="assignment-card">
                    <div className="assignment-title">
                      {assignment.title || `Assignment ${index + 1}`}
                    </div>
                    <div className="assignment-due">
                      Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}
                    </div>
                    {assignment.priority && (
                      <div style={{ 
                        marginTop: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        background: assignment.priority === 'high' ? '#ef4444' : assignment.priority === 'medium' ? '#f59e0b' : '#10b981',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        display: 'inline-block'
                      }}>
                        {assignment.priority} priority
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No upcoming assignments</h3>
                <p>You're all caught up! Create a new assignment to get started.</p>
                <button className="btn-create" onClick={handleCreateAssignment}>
                  Create Assignment
                </button>
              </div>
            )}
          </section>

          {/* Completion Statistics */}
          <section>
            <h2>Progress Overview</h2>
            <div className="completion-stats">
              <div className="completion-stat">
                <span className="value">{completedAssignments.length}</span>
                <span className="label">Completed</span>
              </div>
              <div className="completion-stat">
                <span className="value">{assignments.length - completedAssignments.length}</span>
                <span className="label">Remaining</span>
              </div>
              <div className="completion-stat">
                <span className="value">{overdueAssignments.length}</span>
                <span className="label">Overdue</span>
              </div>
              <div className="completion-stat">
                <span className="value">
                  {assignments.length > 0 ? Math.round((completedAssignments.length / assignments.length) * 100) : 0}%
                </span>
                <span className="label">Overall Progress</span>
              </div>
            </div>
            {assignments.length > 0 && (
              <div className="progress-bar" style={{ marginTop: '1rem' }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${(completedAssignments.length / assignments.length) * 100}%` 
                  }}
                ></div>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="sidebar-widgets">
          {/* Pomodoro Timer */}
          <div className="widget timer-widget">
            <h3>🍅 Focus Timer</h3>
            <div className="timer-display">
              {formatTime(timeLeft)}
            </div>
            <div className="timer-controls">
              <button 
                className="timer-btn"
                onClick={isRunning ? handleTimerPause : handleTimerStart}
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button 
                className="timer-btn"
                onClick={handleTimerReset}
              >
                Reset
              </button>
            </div>
            <div className="progress-text">
              {isRunning ? 'Stay focused!' : 'Ready to start a focus session?'}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="widget">
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className="btn-create"
                onClick={() => navigate('/assignments')}
              >
                📝 View All Assignments
              </button>
              <button 
                className="btn-create"
                onClick={() => navigate('/calendar')}
              >
                📅 Open Calendar
              </button>
              <button 
                className="btn-create"
                onClick={() => navigate('/analytics')}
              >
                📊 View Analytics
              </button>
            </div>
          </div>

          {/* Today's Progress */}
          <div className="widget progress-widget">
            <h3>Today's Progress</h3>
            <div style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--periwinkle)' }}>
              {todayAssignments.filter(a => a.status === 'completed').length} / {todayAssignments.length}
            </div>
            <div className="progress-text">
              {todayAssignments.length === 0 
                ? "No tasks scheduled for today"
                : `${todayAssignments.filter(a => a.status === 'completed').length} of ${todayAssignments.length} tasks completed`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;