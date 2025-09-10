import api from './api';

const timerService = {
  start: (data) => {
    return api.post('/timer/start', data);
  },

  pause: (sessionId) => {
    return api.put(`/timer/pause/${sessionId}`);
  },

  resume: (sessionId) => {
    return api.put(`/timer/resume/${sessionId}`);
  },

  stop: (sessionId) => {
    return api.put(`/timer/stop/${sessionId}`);
  },

  getCurrent: () => {
    return api.get('/timer/current');
  },

  getHistory: () => {
    return api.get('/timer/history');
  },

  getStats: () => {
    return api.get('/timer/stats');
  },
};

export default timerService;