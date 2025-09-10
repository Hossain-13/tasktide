const RecurringTask = require('../models/RecurringTask');
const Assignment = require('../models/Assignment');
const { logger } = require('../utils/logger');

// Generate assignments from recurring tasks
const generateRecurringAssignments = async () => {
  try {
    const activeTasks = await RecurringTask.find({ active: true });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let created = 0;

    for (const task of activeTasks) {
      if (shouldCreateToday(task, today)) {
        // Check if assignment already exists for today
        const existingAssignment = await Assignment.findOne({
          userId: task.userId,
          recurringTaskId: task.id,
          dueDate: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
          }
        });

        if (!existingAssignment) {
          const dueDate = new Date(today);
          dueDate.setHours(23, 59, 59, 999);

          await Assignment.create({
            userId: task.userId,
            courseId: task.courseId,
            title: task.title,
            description: task.description,
            dueDate: dueDate,
            priority: task.priority,
            estimatedTime: task.estimatedTime,
            recurringTaskId: task.id,
            status: 'pending'
          });

          created++;
          logger.info(`Created recurring assignment: ${task.title}`);
        }
      }
    }

    logger.info(`Generated ${created} recurring assignments`);
    return created;
  } catch (error) {
    logger.error('Generate recurring assignments error:', error);
    return 0;
  }
};

// Check if task should be created today
const shouldCreateToday = (task, date) => {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  
  // Check if task has ended
  if (task.endDate && date > task.endDate) {
    return false;
  }
  
  // Check if task has started
  if (task.startDate && date < task.startDate) {
    return false;
  }

  switch (task.frequency) {
    case 'daily':
      return true;
      
    case 'weekly':
      return task.daysOfWeek.includes(dayOfWeek);
      
    case 'biweekly':
      const weeksDiff = Math.floor((date - task.startDate) / (7 * 24 * 60 * 60 * 1000));
      return weeksDiff % 2 === 0 && task.daysOfWeek.includes(dayOfWeek);
      
    case 'monthly':
      return dayOfMonth === task.dayOfMonth;
      
    default:
      return false;
  }
};

module.exports = {
  generateRecurringAssignments,
  shouldCreateToday
};