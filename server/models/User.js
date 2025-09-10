const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  avatar: {
    type: String,
    default: null
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      reminderIntervals: { 
        type: [Number], 
        default: [1440, 120] // in minutes
      }
    },
    timer: {
      pomodoroDuration: { type: Number, default: 25 },
      shortBreakDuration: { type: Number, default: 5 },
      longBreakDuration: { type: Number, default: 15 },
      autoStartBreaks: { type: Boolean, default: false },
      autoStartPomodoros: { type: Boolean, default: false },
      soundEnabled: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    }
  },
  stats: {
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    totalPomodorosCompleted: { type: Number, default: 0 },
    totalFocusTime: { type: Number, default: 0 }, // in minutes
    lastCompletionDate: { type: Date, default: null }
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);