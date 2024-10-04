// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux'; // Import useSelector
import LoginPage from './pages/Login';
import { ThemeContextProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import ThemeToggleButton from './components/ThemeToggleButton';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get auth state

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <div>
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Redirect from the root path */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            {/* Catch-all route for invalid paths */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <ThemeToggleButton />
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
