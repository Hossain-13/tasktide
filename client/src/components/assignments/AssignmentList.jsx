import React from 'react';
import { useSelector } from 'react-redux';
import AssignmentCard from './AssignmentCard';
import Loading from '../common/Loading';

function AssignmentList({ onAssignmentClick }) {
  const { assignments, loading, filters, sortBy } = useSelector(
    (state) => state.assignments
  );

  // Filter assignments
  let filteredAssignments = [...assignments];

  if (filters.status !== 'all') {
    filteredAssignments = filteredAssignments.filter(
      a => a.status === filters.status
    );
  }

  if (filters.priority !== 'all') {
    filteredAssignments = filteredAssignments.filter(
      a => a.priority === filters.priority
    );
  }

  if (filters.search) {
    filteredAssignments = filteredAssignments.filter(
      a => a.title.toLowerCase().includes(filters.search.toLowerCase()) ||
           a.description?.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  // Sort assignments
  filteredAssignments.sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (filteredAssignments.length === 0) {
    return (
      <div className="empty-state">
        <h3>No assignments found</h3>
        <p>Create your first assignment to get started!</p>
      </div>
    );
  }

  return (
    <div className="assignments-grid">
      {filteredAssignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onClick={onAssignmentClick}
        />
      ))}
    </div>
  );
}

export default AssignmentList;