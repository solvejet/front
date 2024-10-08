// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  // Access the authentication state from Redux
  const { isAuthenticated } = useSelector((state) => state.auth); 
  
  // If the user is authenticated, render the children; otherwise, redirect to login
  // return isAuthenticated ? children : children;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
