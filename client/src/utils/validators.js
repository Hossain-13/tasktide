import { VALIDATION } from './constants';

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION.EMAIL_REGEX.test(email)) return 'Invalid email format';
  return null;
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
  }
  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    return `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`;
  }
  return null;
};

/**
 * Validate assignment title
 */
export const validateTitle = (title) => {
  if (!title || !title.trim()) return 'Title is required';
  if (title.length > VALIDATION.TITLE_MAX_LENGTH) {
    return `Title must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters`;
  }
  return null;
};

/**
 * Validate due date
 */
export const validateDueDate = (date) => {
  if (!date) return 'Due date is required';
  const dueDate = new Date(date);
  const now = new Date();
  if (dueDate < now) return 'Due date cannot be in the past';
  return null;
};

/**
 * Validate URL format
 */
export const validateURL = (url) => {
  if (!url) return null; // URL is optional
  if (!VALIDATION.URL_REGEX.test(url)) return 'Invalid URL format';
  return null;
};

/**
 * Validate form data
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    // Required check
    if (fieldRules.required && !value) {
      errors[field] = `${fieldRules.label || field} is required`;
      return;
    }
    
    // Min length check
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = `${fieldRules.label || field} must be at least ${fieldRules.minLength} characters`;
      return;
    }
    
    // Max length check
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = `${fieldRules.label || field} must be less than ${fieldRules.maxLength} characters`;
      return;
    }
    
    // Custom validator
    if (fieldRules.validator && value) {
      const error = fieldRules.validator(value);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Assignment form validation rules
 */
export const assignmentValidationRules = {
  title: {
    required: true,
    maxLength: VALIDATION.TITLE_MAX_LENGTH,
    label: 'Title'
  },
  courseId: {
    required: true,
    label: 'Course'
  },
  dueDate: {
    required: true,
    validator: validateDueDate,
    label: 'Due date'
  },
  description: {
    maxLength: VALIDATION.DESCRIPTION_MAX_LENGTH,
    label: 'Description'
  },
  priority: {
    required: true,
    label: 'Priority'
  }
};

/**
 * Login form validation rules
 */
export const loginValidationRules = {
  email: {
    required: true,
    validator: validateEmail,
    label: 'Email'
  },
  password: {
    required: true,
    minLength: VALIDATION.PASSWORD_MIN_LENGTH,
    label: 'Password'
  }
};

/**
 * Register form validation rules
 */
export const registerValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    label: 'Name'
  },
  email: {
    required: true,
    validator: validateEmail,
    label: 'Email'
  },
  password: {
    required: true,
    minLength: VALIDATION.PASSWORD_MIN_LENGTH,
    maxLength: VALIDATION.PASSWORD_MAX_LENGTH,
    label: 'Password'
  },
  confirmPassword: {
    required: true,
    label: 'Confirm password'
  }
};