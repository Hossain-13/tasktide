import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import timerService from '../../services/timerService';
import toast from 'react-hot-toast';

// Start timer
export const startTimer = createAsyncThunk(
  'timer/start',
  async (timerData, { rejectWithValue }) => {
    try {
      const response = await timerService.start(timerData);
      toast.success('Timer started!');
      return response.data.session;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to start timer';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Stop timer
export const stopTimer = createAsyncThunk(
  'timer/stop',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await timerService.stop(sessionId);
      toast.success('Timer stopped!');
      return response.data.session;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to stop timer';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    currentSession: null,
    isRunning: false,
    isPaused: false,
    timeRemaining: 1500, // 25 minutes in seconds
    sessionType: 'pomodoro',
    settings: {
      pomodoroDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      soundEnabled: true,
    },
    history: [],
    stats: {
      todayPomodoros: 0,
      todayFocusTime: 0,
      totalPomodoros: 0,
    },
  },
  reducers: {
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    setSessionType: (state, action) => {
      state.sessionType = action.payload;
      // Set time based on session type
      switch (action.payload) {
        case 'pomodoro':
          state.timeRemaining = state.settings.pomodoroDuration * 60;
          break;
        case 'shortBreak':
          state.timeRemaining = state.settings.shortBreakDuration * 60;
          break;
        case 'longBreak':
          state.timeRemaining = state.settings.longBreakDuration * 60;
          break;
        default:
          state.timeRemaining = 1500;
      }
    },
    tick: (state) => {
      if (state.isRunning && !state.isPaused && state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Start timer
    builder.addCase(startTimer.fulfilled, (state, action) => {
      state.currentSession = action.payload;
      state.isRunning = true;
      state.isPaused = false;
    });

    // Stop timer
    builder.addCase(stopTimer.fulfilled, (state, action) => {
      state.currentSession = null;
      state.isRunning = false;
      state.isPaused = false;
      if (action.payload.sessionType === 'pomodoro') {
        state.stats.todayPomodoros += 1;
        state.stats.totalPomodoros += 1;
      }
    });
  },
});

export const { 
  setTimeRemaining, 
  togglePause, 
  setSessionType, 
  tick, 
  updateSettings 
} = timerSlice.actions;

export default timerSlice.reducer;