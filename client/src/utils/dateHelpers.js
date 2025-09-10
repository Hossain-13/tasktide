import { format, formatDistance, isPast, isToday, isTomorrow, isThisWeek, addDays, differenceInMinutes } from 'date-fns';

/**
 * Format date for display
 */
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return '';
  return format(new Date(date), formatString);
};

/**
 * Format date with time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy h:mm a');
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

/**
 * Get human-readable due date
 */
export const getDueDateText = (dueDate) => {
  if (!dueDate) return '';
  
  const date = new Date(dueDate);
  
  if (isPast(date)) {
    return `Overdue by ${formatDistance(date, new Date())}`;
  }
  
  if (isToday(date)) {
    return 'Due Today';
  }
  
  if (isTomorrow(date)) {
    return 'Due Tomorrow';
  }
  
  if (isThisWeek(date)) {
    return `Due ${format(date, 'EEEE')}`;
  }
  
  return `Due ${format(date, 'MMM dd')}`;
};

/**
 * Check if date is overdue
 */
export const isOverdue = (date) => {
  if (!date) return false;
  return isPast(new Date(date)) && !isToday(new Date(date));
};

/**
 * Get days until due date
 */
export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Format minutes to hours and minutes
 */
export const formatMinutes = (minutes) => {
  if (!minutes || minutes < 1) return '0m';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Format seconds to MM:SS
 */
export const formatSeconds = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get calendar dates for month view
 */
export const getCalendarDates = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const dates = [];
  const current = new Date(startDate);
  
  while (current <= lastDay || current.getDay() !== 0) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};

/**
 * Get week dates
 */
export const getWeekDates = (date = new Date()) => {
  const week = [];
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);
  
  for (let i = 0; i < 7; i++) {
    week.push(addDays(startOfWeek, i));
  }
  
  return week;
};

/**
 * Calculate time until reminder
 */
export const getTimeUntilReminder = (dueDate, reminderMinutes) => {
  const due = new Date(dueDate);
  const reminderTime = new Date(due.getTime() - reminderMinutes * 60000);
  return reminderTime;
};

/**
 * Check if should send reminder
 */
export const shouldSendReminder = (dueDate, reminderMinutes) => {
  const now = new Date();
  const reminderTime = getTimeUntilReminder(dueDate, reminderMinutes);
  const minutesUntilReminder = differenceInMinutes(reminderTime, now);
  
  return minutesUntilReminder >= 0 && minutesUntilReminder <= 1;
};

export const isTodayDate = (date) => {
  if (!date) return false;
  return isToday(new Date(date));
};