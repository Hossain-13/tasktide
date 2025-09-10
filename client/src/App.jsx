import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import PrivateRoute from './components/common/PrivateRoute';
import Loading from './components/common/Loading';
import { loadUser } from './store/slices/authSlice';

// CSS imports
import './styles/globals.css';
import './styles/variables.css';

function App() {
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('App startup - Token check:', token ? 'Token exists' : 'No token');
    
    if (token) {
      console.log('Token found, loading user...');
      dispatch(loadUser()).catch((err) => {
        console.error('Failed to load user:', err);
        localStorage.removeItem('token');
      });
    }
  }, [dispatch]);

  console.log('App state:', { loading, isAuthenticated, user: !!user });

  if (loading) {
    console.log('App showing loading screen');
    return <Loading fullScreen message="Loading TaskTide..." />;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
        />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Default Route */}
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} 
        />

        {/* Catch all route */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;