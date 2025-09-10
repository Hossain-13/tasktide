import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from '../store/slices/assignmentSlice';
import AssignmentCard from '../components/assignments/AssignmentCard';
import PomodoroTimer from '../components/timer/PomodoroTimer';
import ProgressTracker from '../components/progress/ProgressTracker';
import CompletionStats from '../components/progress/CompletionStats';

function Dashboard() {
  const dispatch = useDispatch();
  const { assignments } = useSelector((state) => state.assignments);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  const todayAssignments = assignments.filter(a => {
    const today = new Date().toDateString();
    return new Date(a.dueDate).toDateString() === today;
  });

  const upcomingAssignments = assignments
    .filter(a => a.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Student'}!</h1>
        <p>You have {todayAssignments.length} tasks due today</p>
      </div>

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
          <div className="stat-value">
            {assignments.filter(a => a.status === 'completed').length}
          </div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user?.stats?.currentStreak || 0}</div>
          <div className="stat-label">Day Streak 🔥</div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="main-content">
          <section>
            <h2>Upcoming Assignments</h2>
            <div className="assignments-list">
              {upcomingAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </section>

          <section>
            <CompletionStats />
          </section>
        </div>

        <div className="sidebar-widgets">
          <PomodoroTimer />
          <ProgressTracker />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
