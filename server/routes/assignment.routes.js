const express = require('express');
const router = express.Router();
const {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  completeAssignment
} = require('../controllers/assignmentController');
const auth = require('../middleware/auth');
const { 
  validateAssignment, 
  handleValidationErrors 
} = require('../utils/validators');

// All routes require authentication
router.use(auth);

router.route('/')
  .get(getAssignments)
  .post(validateAssignment, handleValidationErrors, createAssignment);

router.route('/:id')
  .get(getAssignment)
  .put(validateAssignment, handleValidationErrors, updateAssignment)
  .delete(deleteAssignment);

router.patch('/:id/complete', completeAssignment);

module.exports = router;