const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['reminder', 'overdue', 'completed', 'system'],
    default: 'reminder'
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  read: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  scheduledFor: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for user queries
NotificationSchema.index({ userId: 1, read: 1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);