const Notification = require('../models/Notification');
const Assignment = require('../models/Assignment');
const { logger } = require('../utils/logger');

// Check for assignments due soon and create notifications
const checkUpcomingDeadlines = async () => {
  try {
    const assignments = await Assignment.find({ status: 'pending' });
    const now = new Date();

    for (const assignment of assignments) {
      const timeToDue = assignment.dueDate - now;
      const hoursToDue = timeToDue / (1000 * 60 * 60);

      // Create notifications for different time intervals
      if (hoursToDue <= 24 && hoursToDue > 23) {
        await createNotification(
          assignment.userId,
          assignment.id,
          'reminder',
          'Assignment Due Tomorrow',
          `"${assignment.title}" is due tomorrow!`
        );
      } else if (hoursToDue <= 2 && hoursToDue > 1) {
        await createNotification(
          assignment.userId,
          assignment.id,
          'reminder',
          'Assignment Due Soon',
          `"${assignment.title}" is due in 2 hours!`
        );
      }
    }
  } catch (error) {
    logger.error('Check deadlines error:', error);
  }
};

// Create a notification
const createNotification = async (userId, assignmentId, type, title, message) => {
  try {
    // Check if notification already exists
    const existing = await Notification.findOne({
      userId,
      assignmentId,
      title,
      read: false
    });

    if (!existing) {
      await Notification.create({
        userId,
        assignmentId,
        type,
        title,
        message
        // ... continuing notificationService.js
     });
     logger.info(`Notification created for user ${userId}: ${title}`);
   }
 } catch (error) {
   logger.error('Create notification error:', error);
 }
};

// Mark overdue assignments
const markOverdueAssignments = async () => {
 try {
   const now = new Date();
   const assignments = await Assignment.find({
     status: 'pending',
     dueDate: { $lt: now }
   });

   for (const assignment of assignments) {
     assignment.status = 'overdue';
     await assignment.save();
     
     await createNotification(
       assignment.userId,
       assignment.id,
       'overdue',
       'Assignment Overdue',
       `"${assignment.title}" is now overdue!`
     );
   }

   logger.info(`Marked ${assignments.length} assignments as overdue`);
 } catch (error) {
   logger.error('Mark overdue error:', error);
 }
};

module.exports = {
 checkUpcomingDeadlines,
 createNotification,
 markOverdueAssignments
};