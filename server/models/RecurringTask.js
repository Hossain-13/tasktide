const mongoose = require('mongoose');

const RecurringTaskSchema = new mongoose.Schema({
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
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 1000
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'biweekly', 'monthly'],
    default: 'weekly'
  },
  daysOfWeek: [{
    type: Number,
    min: 0,
    max: 6
  }], // 0 = Sunday, 6 = Saturday
  dayOfMonth: {
    type: Number,
    min: 1,
    max: 31,
    default: 1
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  estimatedTime: {
    type: Number,
    default: 60
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for active recurring tasks
RecurringTaskSchema.index({ userId: 1, active: 1 });

module.exports = mongoose.model('RecurringTask', RecurringTaskSchema);