// Timer-specific helper functions

/**
 * Convert minutes to seconds
 */
export const minutesToSeconds = (minutes) => {
  return minutes * 60;
};

/**
 * Convert seconds to minutes
 */
export const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

/**
 * Format seconds to MM:SS display
 */
export const formatTimerDisplay = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate pomodoro sessions from total minutes
 */
export const calculatePomodoros = (totalMinutes, pomodoroLength = 25) => {
  return Math.floor(totalMinutes / pomodoroLength);
};

/**
 * Get next timer mode after current session
 */
export const getNextTimerMode = (currentMode, sessionsCompleted) => {
  if (currentMode === 'pomodoro') {
    // After 4 pomodoros, take a long break
    if ((sessionsCompleted + 1) % 4 === 0) {
      return 'long_break';
    }
    return 'short_break';
  }
  return 'pomodoro';
};

/**
 * Calculate total focus time from timer sessions
 */
export const calculateTotalFocusTime = (sessions) => {
  return sessions
    .filter(session => session.sessionType === 'pomodoro' && session.completed)
    .reduce((total, session) => {
      const duration = session.duration || 0;
      return total + Math.floor(duration / 60);
    }, 0);
};

/**
 * Calculate productivity score
 */
export const calculateProductivityScore = (completedPomodoros, targetPomodoros = 8) => {
  const percentage = (completedPomodoros / targetPomodoros) * 100;
  return Math.min(percentage, 100);
};

/**
 * Get timer notification message
 */
export const getTimerNotificationMessage = (mode) => {
  const messages = {
    pomodoro_complete: 'Great work! Time for a break.',
    short_break_complete: 'Break\'s over! Ready to focus?',
    long_break_complete: 'Well rested! Let\'s get back to work.',
    session_start: 'Timer started. Stay focused!',
    session_paused: 'Timer paused. Take your time.'
  };
  
  return messages[mode] || 'Timer updated';
};