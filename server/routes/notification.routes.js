const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  updateSettings
} = require('../controllers/notificationController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);
router.put('/settings', updateSettings);

module.exports = router;