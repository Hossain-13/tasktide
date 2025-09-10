import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../../services/notificationService';

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.getAll();
      return response.data.notifications;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }
);

// Mark as read
export const markAsRead = createAsyncThunk(
  'notifications/markRead',
  async (id, { rejectWithValue }) => {
    try {
      const response = await notificationService.markAsRead(id);
      return response.data.notification;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark as read');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    // Fetch notifications
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.read).length;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Mark as read
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state.notifications[index] = action.payload;
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      }
    });
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;