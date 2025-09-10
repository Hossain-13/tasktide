import api from './api';

const authService = {
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },

  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  getMe: () => {
    return api.get('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

export default authService;