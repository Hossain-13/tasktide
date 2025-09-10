const mongoose = require('mongoose');

const TimerSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    default: null
  },
  sessionType: {
    type: String,
    enum: ['pomodoro', 'short_break', 'long_break', 'custom'],
    default: 'pomodoro'
  },
  duration: {
    type: Number,
    required: true,
    default: 1500 // in seconds
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  pausedDuration: {
    type: Number,
    default: 0 // total pause time in seconds
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Index for user queries
TimerSessionSchema.index({ userId: 1, completed: 1 });
TimerSessionSchema.index({ userId: 1, startTime: -1 });

module.exports = mongoose.model('TimerSession', TimerSessionSchema);