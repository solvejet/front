// src/components/ThemeToggleButton.jsx
import React from 'react';
import { Fab } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material'; // Icons for light and dark mode
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext(); // Access the theme context

  return (
    <Fab 
      onClick={toggleTheme} 
      color="primary" 
      sx={{ position: 'fixed', bottom: 16, left: 16, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} // Animation on hover
    >
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />} {/* Toggle between icons */}
    </Fab>
  );
};

export default ThemeToggleButton;
