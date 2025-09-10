const express = require('express');
const router = express.Router();
const {
  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
  getCurrentTimer,
  getTimerHistory,
  getTimerStats
} = require('../controllers/timerController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.post('/start', startTimer);
router.put('/pause/:sessionId', pauseTimer);
router.put('/resume/:sessionId', resumeTimer);
router.put('/stop/:sessionId', stopTimer);
router.get('/current', getCurrentTimer);
router.get('/history', getTimerHistory);
router.get('/stats', getTimerStats);

module.exports = router;