import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    settings: {
      enabled: true,
      sound: true,
      desktop: true,
    },
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  updateSettings,
} = notificationSlice.actions;

export default notificationSlice.reducer;