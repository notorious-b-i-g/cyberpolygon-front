import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authApi from '../api/auth';

const PrivateRoute = ({ redirectPath = '/auth' }) => {
  const isAuthenticated = authApi.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute; 