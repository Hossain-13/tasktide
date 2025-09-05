const cron = require('node-cron');

/**
 * Schedule daily task to check for overdue assignments
 * Runs every day at midnight
 */
const scheduleOverdueCheck = (Assignment) => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running overdue assignments check...');
    
    try {
      const now = new Date();
      
      // Find all pending assignments that are past due
      const overdueAssignments = await Assignment.updateMany(
        {
          status: 'pending',
          dueDate: { $lt: now }
        },
        {
          status: 'overdue'
        }
      );
      
      console.log(`Updated ${overdueAssignments.modifiedCount} assignments to overdue status`);
    } catch (error) {
      console.error('Error checking overdue assignments:', error);
    }
  });
};

/**
 * Schedule recurring task generation
 * Runs every day at 1 AM
 */
const scheduleRecurringTaskGeneration = (RecurringTask, Assignment) => {
  cron.schedule('0 1 * * *', async () => {
    console.log('Running recurring task generation...');
    
    try {
      const activeTasks = await RecurringTask.find({ active: true });
      
      for (const task of activeTasks) {
        // Check if we need to create a new assignment for today
        const today = new Date();
        const shouldCreateToday = checkIfShouldCreateToday(task, today);
        
        if (shouldCreateToday) {
          const newAssignment = new Assignment({
            userId: task.userId,
            courseId: task.courseId,
            title: task.title,
            description: task.description,
            dueDate: calculateDueDate(today, task),
            priority: task.priority,
            estimatedTime: task.estimatedTime,
            recurringTaskId: task._id,
            status: 'pending'
          });
          
          await newAssignment.save();
          console.log(`Created recurring assignment: ${task.title}`);
        }
      }
    } catch (error) {
      console.error('Error generating recurring tasks:', error);
    }
  });
};

/**
 * Helper function to check if task should be created today
 */
const checkIfShouldCreateToday = (task, date) => {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  
  switch (task.frequency) {
    case 'daily':
      return true;
      
    case 'weekly':
      return task.daysOfWeek.includes(dayOfWeek);
      
    case 'biweekly':
      // Check if it's been 2 weeks since start date
      const weeksDiff = Math.floor((date - task.startDate) / (7 * 24 * 60 * 60 * 1000));
      return weeksDiff % 2 === 0 && task.daysOfWeek.includes(dayOfWeek);
      
    case 'monthly':
      return dayOfMonth === task.dayOfMonth;
      
    default:
      return false;
  }
};

/**
 * Calculate due date based on task settings
 */
const calculateDueDate = (date, task) => {
  const dueDate = new Date(date);
  dueDate.setHours(23, 59, 59, 999); // Set to end of day
  return dueDate;
};

/**
 * Initialize all cron jobs
 */
const initializeCronJobs = (models) => {
  const { Assignment, RecurringTask } = models;
  
  console.log('Initializing cron jobs...');
  
  scheduleOverdueCheck(Assignment);
  scheduleRecurringTaskGeneration(RecurringTask, Assignment);
  
  console.log('Cron jobs initialized successfully');
};

module.exports = {
  initializeCronJobs,
  scheduleOverdueCheck,
  scheduleRecurringTaskGeneration
};