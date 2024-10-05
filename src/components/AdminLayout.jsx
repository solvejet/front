// src/components/AdminLayout.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ width: '100vw', margin: 0, padding: 0 }}>
      <AppBar position="static" sx={{ bgcolor: 'card.background', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Admin Dashboard
          </Typography>
          <Button component={Link} to="/inbox" sx={{color: 'text.primary'}}>Inbox</Button>
          <Button component={Link} to="/admin/users" sx={{color: 'text.primary'}}>Users</Button>
          <Button component={Link} to="/admin/settings" sx={{color: 'text.primary'}}>Settings</Button>
          <Button component={Link} to="/admin/reports" sx={{color: 'text.primary'}}>Reports</Button>
          {/* Add more links as needed */}
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
