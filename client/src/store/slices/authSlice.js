import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import toast from 'react-hot-toast';

// Load user
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getMe();
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load user');
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      toast.success('Logged out successfully');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load User
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      toast.success('Login successful!');
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      toast.success('Registration successful!');
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;