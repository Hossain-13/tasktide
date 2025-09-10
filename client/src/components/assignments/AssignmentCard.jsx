import React from 'react';
import { useDispatch } from 'react-redux';
import { completeAssignment, deleteAssignment } from '../../store/slices/assignmentSlice';
import { getDueDateText } from '../../utils/dateHelpers';
import { PRIORITY_COLORS } from '../../utils/constants';

function AssignmentCard({ assignment, onClick }) {
  const dispatch = useDispatch();

  const handleComplete = (e) => {
    e.stopPropagation();
    dispatch(completeAssignment(assignment.id));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      dispatch(deleteAssignment(assignment.id));
    }
  };

  const priorityColor = PRIORITY_COLORS[assignment.priority] || '#666';

  return (
    <div 
      className={`assignment-card ${assignment.status}`}
      onClick={() => onClick(assignment)}
    >
      <div className="assignment-header">
        <div className="assignment-info">
          <span className="course-tag" style={{ backgroundColor: assignment.courseColor }}>
            {assignment.courseName || 'No Course'}
          </span>
          <h3 className="assignment-title">{assignment.title}</h3>
          <div className="assignment-meta">
            <span>📅 {getDueDateText(assignment.dueDate)}</span>
            <span>⏱️ {assignment.estimatedTime} min</span>
            {assignment.pomodoroCount > 0 && (
              <span>🍅 {assignment.pomodoroCount} pomodoros</span>
            )}
          </div>
        </div>
        <div 
          className="priority-indicator"
          style={{ backgroundColor: priorityColor }}
          title={`Priority: ${assignment.priority}`}
        />
      </div>

      <div className="assignment-actions">
        {assignment.status !== 'completed' && (
          <button 
            className="btn-small btn-complete"
            onClick={handleComplete}
          >
            ✓ Complete
          </button>
        )}
        <button 
          className="btn-small btn-timer"
          onClick={(e) => {
            e.stopPropagation();
            // Open timer with this assignment
          }}
        >
          ⏱️ Timer
        </button>
        <button 
          className="btn-small btn-delete"
          onClick={handleDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default AssignmentCard;