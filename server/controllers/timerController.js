const TimerSession = require('../models/TimerSession');
const Assignment = require('../models/Assignment');
const User = require('../models/User');
const { logger } = require('../utils/logger');

// @desc    Start timer session
// @route   POST /api/timer/start
// @access  Private
exports.startTimer = async (req, res) => {
  try {
    const { assignmentId, sessionType, duration } = req.body;

    const session = await TimerSession.create({
      userId: req.userId,
      assignmentId,
      sessionType: sessionType || 'pomodoro',
      duration: duration || 1500, // 25 minutes default
      startTime: new Date(),
      completed: false
    });

    logger.info(`Timer started for user ${req.userId}`);

    res.status(201).json({
      success: true,
      session
    });
  } catch (error) {
    logger.error('Start timer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Pause timer
// @route   PUT /api/timer/pause/:sessionId
// @access  Private
exports.pauseTimer = async (req, res) => {
  try {
    const session = await TimerSession.findById(req.params.sessionId);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    session.pausedAt = new Date();
    session.isPaused = true;
    await session.save();

    res.json({
      success: true,
      session
    });
  } catch (error) {
    logger.error('Pause timer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Resume timer
// @route   PUT /api/timer/resume/:sessionId
// @access  Private
exports.resumeTimer = async (req, res) => {
  try {
    const session = await TimerSession.findById(req.params.sessionId);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (session.pausedAt) {
      const pauseDuration = Date.now() - session.pausedAt.getTime();
      session.pausedDuration = (session.pausedDuration || 0) + pauseDuration;
    }

    session.isPaused = false;
    session.pausedAt = null;
    await session.save();

    res.json({
      success: true,
      session
    });
  } catch (error) {
    logger.error('Resume timer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Stop/complete timer
// @route   PUT /api/timer/stop/:sessionId
// @access  Private
exports.stopTimer = async (req, res) => {
  try {
    const session = await TimerSession.findById(req.params.sessionId);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    session.endTime = new Date();
    session.completed = true;
    await session.save();

    // Update assignment time and pomodoro count
    if (session.assignmentId && session.sessionType === 'pomodoro') {
      const assignment = await Assignment.findById(session.assignmentId);
      if (assignment) {
        assignment.totalTimeSpent += Math.floor(session.duration / 60);
        assignment.pomodoroCount += 1;
        await assignment.save();
      }
    }

    // Update user stats
    const user = await User.findById(req.userId);
    if (user && session.sessionType === 'pomodoro') {
      user.stats.totalPomodorosCompleted += 1;
      user.stats.totalFocusTime += Math.floor(session.duration / 60);
      await user.save();
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    logger.error('Stop timer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current active timer
// @route   GET /api/timer/current
// @access  Private
exports.getCurrentTimer = async (req, res) => {
  try {
    const session = await TimerSession.findOne({
      userId: req.userId,
      completed: false
    });

    res.json({
      success: true,
      session
    });
  } catch (error) {
    logger.error('Get current timer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get timer history
// @route   GET /api/timer/history
// @access  Private
exports.getTimerHistory = async (req, res) => {
  try {
    const sessions = await TimerSession.find({
      userId: req.userId,
      completed: true
    }).sort({ endTime: -1 }).limit(50);

    res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    logger.error('Get timer history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get timer statistics
// @route   GET /api/timer/stats
// @access  Private
exports.getTimerStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySessions = await TimerSession.find({
      userId: req.userId,
      completed: true,
      endTime: { $gte: today }
    });

    const stats = {
      todayPomodoros: todaySessions.filter(s => s.sessionType === 'pomodoro').length,
      todayFocusTime: todaySessions
        .filter(s => s.sessionType === 'pomodoro')
        .reduce((acc, s) => acc + s.duration, 0) / 60, // in minutes
      todayBreakTime: todaySessions
        .filter(s => s.sessionType !== 'pomodoro')
        .reduce((acc, s) => acc + s.duration, 0) / 60,
      totalSessions: todaySessions.length
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    logger.error('Get timer stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};