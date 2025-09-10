import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loading fullScreen />; // show loader while checking auth

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;