const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a course name'],
    trim: true,
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  code: {
    type: String,
    trim: true,
    maxlength: [20, 'Course code cannot be more than 20 characters']
  },
  instructor: {
    type: String,
    trim: true,
    maxlength: [100, 'Instructor name cannot be more than 100 characters']
  },
  color: {
    type: String,
    default: '#8B5CF6',
    match: [/^#[0-9A-F]{6}$/i, 'Please provide a valid hex color']
  },
  semester: {
    type: String,
    trim: true
  },
  credits: {
    type: Number,
    min: 0,
    max: 10
  }
}, {
  timestamps: true
});

// Index for user queries
CourseSchema.index({ userId: 1 });

module.exports = mongoose.model('Course', CourseSchema);