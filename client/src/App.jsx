import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import PrivateRoute from './components/common/PrivateRoute';
import Loading from './components/common/Loading';
import { loadUser } from './store/slices/authSlice';

// CSS imports
import './styles/globals.css';
import './styles/variables.css';

function App() {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser()).catch((err) => {
        console.error('Failed to load user:', err);
        localStorage.removeItem('token'); // remove invalid token
      });
    }
  }, [dispatch]);

  if (loading) return <Loading fullScreen />;

  return (
    <Router>
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

      {/* Test element to check CSS */}
      <div className="test-css">
        If you see a yellow background with blue text, CSS loaded!
      </div>

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more protected routes here if needed */}
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
