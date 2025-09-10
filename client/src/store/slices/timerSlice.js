import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    isRunning: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    currentSession: 'pomodoro',
    completedSessions: 0,
    settings: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      longBreakInterval: 4,
    },
  },
  reducers: {
    startTimer: (state, action) => {
      const { sessionType, duration } = action.payload;
      state.sessionType = sessionType;
      state.timeRemaining = duration;
      state.isRunning = true;
      state.isPaused = false;
      state.currentSession = { id: Date.now(), type: sessionType };
},
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    stopTimer: (state) => {
      state.isRunning = false;
      state.timeLeft = state.settings.pomodoro * 60;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.timeLeft = state.settings.pomodoro * 60;
    },
    togglePause: (state) => {
      state.isRunning = !state.isRunning;
    },
    tick: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    completeSession: (state) => {
      state.completedSessions += 1;
      state.isRunning = false;
    },
    setSession: (state, action) => {
      state.currentSession = action.payload.type;
      state.timeLeft = action.payload.duration;
      state.isRunning = false;
    },
    setSessionType: (state, action) => {
      state.currentSession = action.payload;
      // Set default duration based on session type
      const durations = {
        pomodoro: state.settings.pomodoro * 60,
        shortBreak: state.settings.shortBreak * 60,
        longBreak: state.settings.longBreak * 60
      };
      state.timeLeft = durations[action.payload] || state.settings.pomodoro * 60;
      state.isRunning = false;
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
      // Update current timer if not running
      if (!state.isRunning) {
        const durations = {
          pomodoro: state.settings.pomodoro * 60,
          shortBreak: state.settings.shortBreak * 60,
          longBreak: state.settings.longBreak * 60
        };
        state.timeLeft = durations[state.currentSession] || state.settings.pomodoro * 60;
      }
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  stopTimer,
  resetTimer,
  togglePause,
  tick,
  completeSession,
  setSession,
  setSessionType,
  updateSettings,
} = timerSlice.actions;

export default timerSlice.reducer;