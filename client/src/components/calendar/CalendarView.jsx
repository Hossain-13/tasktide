import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCalendarDates } from '../../utils/dateHelpers';
import CalendarDay from './CalendarDay';

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { assignments } = useSelector((state) => state.assignments);

  const calendarDates = useMemo(() => {
    return getCalendarDates(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
  }, [currentDate]);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{monthYear}</h2>
        <div className="calendar-nav">
          <button 
            className="btn-secondary"
            onClick={() => navigateMonth(-1)}
          >
            ← Previous
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigateMonth(1)}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {calendarDates.map((date, index) => (
            <CalendarDay
              key={index}
              date={date}
              assignments={assignments.filter(
                a => new Date(a.dueDate).toDateString() === date.toDateString()
              )}
              isCurrentMonth={date.getMonth() === currentDate.getMonth()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;