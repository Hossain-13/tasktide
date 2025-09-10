import React from 'react';
import CalendarView from '../components/calendar/CalendarView';

function Calendar() {
  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>Calendar</h1>
      </div>
      <CalendarView />
    </div>
  );
}

export default Calendar;