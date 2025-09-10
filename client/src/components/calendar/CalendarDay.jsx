import React from 'react';
import { isTodayDate } from '../../utils/dateHelpers';

function CalendarDay({ date, assignments, isCurrentMonth }) {
  const today = isTodayDate(date);
  
  return (
    <div 
      className={`calendar-day ${today ? 'today' : ''} ${
        !isCurrentMonth ? 'other-month' : ''
      }`}
    >
      <div className="day-number">{date.getDate()}</div>
      
      {assignments.length > 0 && (
        <div className="day-events">
          {assignments.slice(0, 3).map((assignment, index) => (
            <div
              key={index}
              className={`event-item event-${assignment.priority}`}
              title={assignment.title}
            >
              {assignment.title}
            </div>
          ))}
          {assignments.length > 3 && (
            <div className="event-more">+{assignments.length - 3} more</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarDay