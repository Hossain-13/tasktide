const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const auth = require('../middleware/auth');
const { 
  validateCourse, 
  handleValidationErrors 
} = require('../utils/validators');

// All routes require authentication
router.use(auth);

router.route('/')
  .get(getCourses)
  .post(validateCourse, handleValidationErrors, createCourse);

router.route('/:id')
  .get(getCourse)
  .put(validateCourse, handleValidationErrors, updateCourse)
  .delete(deleteCourse);

module.exports = router;