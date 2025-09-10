import React from 'react';
import { getDueDateText } from '../../utils/dateHelpers';

function DeadlineMarker({ assignment }) {
  return (
    <div className={`deadline-marker priority-${assignment.priority}`}>
      <span className="deadline-time">
        {getDueDateText(assignment.dueDate)}
      </span>
      <span className="deadline-title">{assignment.title}</span>
    </div>
  );
}

export default DeadlineMarker;