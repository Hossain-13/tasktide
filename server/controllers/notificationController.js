const Notification = require('../models/Notification');
const { logger } = require('../utils/logger');

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    logger.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    notification.read = true;
    await notification.save();

    res.json({
      success: true,
      notification
    });
  } catch (error) {
    logger.error('Mark notification read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Private
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.userId, read: false },
      { read: true }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    logger.error('Mark all notifications read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await notification.remove();

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    logger.error('Delete notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update notification settings
// @route   PUT /api/notifications/settings
// @access  Private
exports.updateSettings = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.preferences.notifications = {
      ...user.preferences.notifications,
      ...req.body
    };

    await user.save();

    res.json({
      success: true,
      settings: user.preferences.notifications
    });
  } catch (error) {
    logger.error('Update notification settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};