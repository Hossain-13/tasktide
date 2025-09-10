const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const { logger } = require('../utils/logger');

// @desc    Get all assignments for user
// @route   GET /api/assignments
// @access  Private
exports.getAssignments = async (req, res) => {
  try {
    const { status, priority, courseId, sortBy = '-dueDate' } = req.query;
    
    // Build query
    const query = { userId: req.userId };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (courseId) query.courseId = courseId;

    const assignments = await Assignment.find(query)
      .populate('courseId', 'name code color')
      .sort(sortBy);

    res.json({
      success: true,
      count: assignments.length,
      assignments
    });

  } catch (error) {
    logger.error('Get assignments error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get single assignment
// @route   GET /api/assignments/:id
// @access  Private
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('courseId', 'name code color');
    
    if (!assignment) {
      return res.status(404).json({ 
        success: false,
        message: 'Assignment not found' 
      });
    }

    // Check ownership
    if (assignment.userId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }

    res.json({
      success: true,
      assignment
    });

  } catch (error) {
    logger.error('Get assignment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Create assignment
// @route   POST /api/assignments
// @access  Private
exports.createAssignment = async (req, res) => {
  try {
    const assignmentData = {
      ...req.body,
      userId: req.userId
    };

    const assignment = await Assignment.create(assignmentData);
    
    // Populate course details
    await assignment.populate('courseId', 'name code color');

    logger.info(`Assignment created: ${assignment.title} by user ${req.userId}`);

    res.status(201).json({
      success: true,
      assignment
    });

  } catch (error) {
    logger.error('Create assignment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Update assignment
// @route   PUT /api/assignments/:id
// @access  Private
exports.updateAssignment = async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ 
        success: false,
        message: 'Assignment not found' 
      });
    }

    // Check ownership
    if (assignment.userId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }

    assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('courseId', 'name code color');

    res.json({
      success: true,
      assignment
    });

  } catch (error) {
    logger.error('Update assignment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ 
        success: false,
        message: 'Assignment not found' 
      });
    }

    // Check ownership
    if (assignment.userId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }

    await assignment.deleteOne();

    res.json({
      success: true,
      message: 'Assignment deleted'
    });

  } catch (error) {
    logger.error('Delete assignment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Mark assignment as complete
// @route   PATCH /api/assignments/:id/complete
// @access  Private
exports.completeAssignment = async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ 
        success: false,
        message: 'Assignment not found' 
      });
    }

    // Check ownership
    if (assignment.userId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }

    assignment.status = 'completed';
    assignment.completedAt = new Date();
    await assignment.save();

    await assignment.populate('courseId', 'name code color');

    // Update user streak
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    
    const today = new Date().setHours(0, 0, 0, 0);
    const lastCompletion = user.stats.lastCompletionDate ? 
      new Date(user.stats.lastCompletionDate).setHours(0, 0, 0, 0) : null;

    if (!lastCompletion || lastCompletion < today) {
      user.stats.currentStreak += 1;
      user.stats.lastCompletionDate = new Date();
      if (user.stats.currentStreak > user.stats.longestStreak) {
        user.stats.longestStreak = user.stats.currentStreak;
      }
      await user.save();
    }

    res.json({
      success: true,
      assignment
    });

  } catch (error) {
    logger.error('Complete assignment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get calendar data
// @route   GET /api/assignments/calendar
// @access  Private
exports.getCalendarData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { 
      userId: req.userId,
      dueDate: {
        $gte: new Date(startDate || new Date().setDate(1)),
        $lte: new Date(endDate || new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))
      }
    };

    const assignments = await Assignment.find(query)
      .populate('courseId', 'name code color')
      .sort('dueDate');

    res.json({
      success: true,
      assignments
    });

  } catch (error) {
    logger.error('Get calendar data error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};