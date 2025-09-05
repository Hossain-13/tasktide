const { body, validationResult } = require('express-validator');

// Validation rules for registration
const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation rules for login
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Validation rules for creating assignment
const validateAssignment = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  
  body('courseId')
    .notEmpty().withMessage('Course is required')
    .isMongoId().withMessage('Invalid course ID'),
  
  body('dueDate')
    .notEmpty().withMessage('Due date is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Due date cannot be in the past');
      }
      return true;
    }),
  
  body('priority')
    .notEmpty().withMessage('Priority is required')
    .isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority level'),
  
  body('description')
    .optional()
    .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  
  body('estimatedTime')
    .optional()
    .isNumeric().withMessage('Estimated time must be a number')
    .custom((value) => value >= 0).withMessage('Estimated time must be positive')
];

// Validation rules for creating course
const validateCourse = [
  body('name')
    .trim()
    .notEmpty().withMessage('Course name is required')
    .isLength({ max: 100 }).withMessage('Course name must be less than 100 characters'),
  
  body('code')
    .trim()
    .optional()
    .isLength({ max: 20 }).withMessage('Course code must be less than 20 characters'),
  
  body('instructor')
    .trim()
    .optional()
    .isLength({ max: 100 }).withMessage('Instructor name must be less than 100 characters'),
  
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i).withMessage('Color must be a valid hex code')
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateAssignment,
  validateCourse,
  handleValidationErrors
};