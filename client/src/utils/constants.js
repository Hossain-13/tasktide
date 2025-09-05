// Application constants and configuration

export const APP_NAME = 'TaskTide';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = 10000; // 10 seconds

// Assignment Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: '#10B981',
  [PRIORITY_LEVELS.MEDIUM]: '#F59E0B',
  [PRIORITY_LEVELS.HIGH]: '#EF4444',
  [PRIORITY_LEVELS.CRITICAL]: '#991B1B'
};

// Assignment Status
export const ASSIGNMENT_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue'
};

// Pomodoro Timer Settings (in minutes)
export const TIMER_SETTINGS = {
  POMODORO: 25,
  SHORT_BREAK: 5,
  LONG_BREAK: 15,
  SESSIONS_BEFORE_LONG_BREAK: 4
};

// Notification Settings (in minutes before due date)
export const NOTIFICATION_INTERVALS = [
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: '1 day', value: 1440 },
  { label: '2 days', value: 2880 }
];

// Recurring Task Frequencies
export const RECURRENCE_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly'
};

// Days of week (for recurring tasks)
export const DAYS_OF_WEEK = [
  { label: 'Sunday', value: 0, short: 'Sun' },
  { label: 'Monday', value: 1, short: 'Mon' },
  { label: 'Tuesday', value: 2, short: 'Tue' },
  { label: 'Wednesday', value: 3, short: 'Wed' },
  { label: 'Thursday', value: 4, short: 'Thu' },
  { label: 'Friday', value: 5, short: 'Fri' },
  { label: 'Saturday', value: 6, short: 'Sat' }
];

// Sort Options
export const SORT_OPTIONS = {
  DUE_DATE_ASC: 'dueDate_asc',
  DUE_DATE_DESC: 'dueDate_desc',
  PRIORITY_ASC: 'priority_asc',
  PRIORITY_DESC: 'priority_desc',
  TITLE_ASC: 'title_asc',
  TITLE_DESC: 'title_desc',
  COURSE_ASC: 'course_asc',
  COURSE_DESC: 'course_desc'
};

// Filter Options
export const FILTER_OPTIONS = {
  ALL: 'all',
  TODAY: 'today',
  THIS_WEEK: 'this_week',
  THIS_MONTH: 'this_month',
  OVERDUE: 'overdue'
};

// Export Formats
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  CSV: 'csv',
  TXT: 'txt'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'tasktide_token',
  USER_DATA: 'tasktide_user',
  THEME: 'tasktide_theme',
  TIMER_SETTINGS: 'tasktide_timer_settings',
  FILTER_PREFERENCES: 'tasktide_filter_preferences'
};

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 1000,
  COURSE_NAME_MAX_LENGTH: 100,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL_REGEX: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ASSIGNMENT_CREATED: 'Assignment created successfully!',
  ASSIGNMENT_UPDATED: 'Assignment updated successfully!',
  ASSIGNMENT_DELETED: 'Assignment deleted successfully!',
  ASSIGNMENT_COMPLETED: 'Great job! Assignment marked as complete!',
  LOGIN_SUCCESS: 'Welcome back! Login successful.',
  REGISTER_SUCCESS: 'Account created successfully!',
  TIMER_STARTED: 'Timer started. Stay focused!',
  TIMER_PAUSED: 'Timer paused. Take a break!',
  TIMER_COMPLETED: 'Session completed! Well done!',
  EXPORT_SUCCESS: 'Data exported successfully!'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please login to continue.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  ASSIGNMENT_CREATE_FAILED: 'Failed to create assignment. Please try again.',
  LOGIN_FAILED: 'Invalid email or password.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  TIMER_START_FAILED: 'Failed to start timer. Please try again.'
};