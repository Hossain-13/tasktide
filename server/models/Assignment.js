const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: null
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'overdue'],
    default: 'pending'
  },
  completedAt: {
    type: Date,
    default: null
  },
  estimatedTime: {
    type: Number,
    default: 60 // in minutes
  },
  actualTime: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  },
  pomodoroCount: {
    type: Number,
    default: 0
  },
  links: [{
    title: String,
    url: String,
    addedAt: { type: Date, default: Date.now }
  }],
  recurringTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecurringTask',
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  reminders: [{
    time: Date,
    sent: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

// Index for better query performance
AssignmentSchema.index({ userId: 1, dueDate: 1 });
AssignmentSchema.index({ userId: 1, status: 1 });

// Virtual for course details
AssignmentSchema.virtual('course', {
  ref: 'Course',
  localField: 'courseId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Assignment', AssignmentSchema);