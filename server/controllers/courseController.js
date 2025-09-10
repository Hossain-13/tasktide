const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const { logger } = require('../utils/logger');

// @desc    Get all courses for user
// @route   GET /api/courses
// @access  Private
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.userId });
    
    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    logger.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Private
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check ownership
    if (course.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Get assignments for this course
    const assignments = await Assignment.find({ 
      userId: req.userId,
      courseId: req.params.id 
    });

    res.json({
      success: true,
      course,
      assignments
    });
  } catch (error) {
    logger.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private
exports.createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      userId: req.userId
    };

    const course = await Course.create(courseData);
    
    logger.info(`Course created: ${course.name} by user ${req.userId}`);

    res.status(201).json({
      success: true,
      course
    });
  } catch (error) {
    logger.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check ownership
    if (course.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      course: updated
    });
  } catch (error) {
    logger.error('Update course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check ownership
    if (course.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if course has assignments
    const assignments = await Assignment.find({ 
      userId: req.userId,
      courseId: req.params.id 
    });

    if (assignments.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete course with existing assignments' 
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Course deleted'
    });
  } catch (error) {
    logger.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};