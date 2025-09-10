// client/src/services/authService.js
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Don't redirect here to avoid infinite loops
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Register user
  register: (userData) => {
    console.log('🔄 AuthService: Registering user...', userData.email);
    return api.post('/auth/register', userData);
  },
  
  // Login user
  login: (credentials) => {
    console.log('🔄 AuthService: Logging in user...', credentials.email);
    return api.post('/auth/login', credentials);
  },
  
  // Get current user
  getMe: () => {
    console.log('🔄 AuthService: Getting current user...');
    return api.get('/auth/me');
  },
  
  // Logout (client-side)
  logout: () => {
    console.log('🔄 AuthService: Logging out...');
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

export default authService;