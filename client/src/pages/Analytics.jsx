import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from '../store/slices/assignmentSlice';
import CompletionStats from '../components/progress/CompletionStats';
import SubjectBreakdown from '../components/progress/SubjectBreakdown';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Analytics() {
  const dispatch = useDispatch();
  const { assignments } = useSelector((state) => state.assignments);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', completed: 4 },
    { day: 'Tue', completed: 3 },
    { day: 'Wed', completed: 5 },
    { day: 'Thu', completed: 2 },
    { day: 'Fri', completed: 6 },
    { day: 'Sat', completed: 4 },
    { day: 'Sun', completed: 3 },
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics & Progress</h1>
        <p>Total Assignments: {assignments.length}</p>
      </div>

      <CompletionStats />

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="var(--periwinkle)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Progress Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="var(--primary-yellow)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <SubjectBreakdown courses={[]} />
    </div>
  );
}

export default Analytics;
