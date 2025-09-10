import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import assignmentSlice from './slices/assignmentSlice';
import timerSlice from './slices/timerSlice';
import notificationSlice from './slices/notificationSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    assignments: assignmentSlice,
    timer: timerSlice,
    notifications: notificationSlice,
    ui: uiSlice,
  },
});