// src/components/AdminLayout.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { navBars } from "../constant/navBar";
import { useState } from "react";
import RouterPaths from "../route.paths";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logoutUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { MoreVert } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutIcon from "@mui/icons-material/Logout";

// E:\PROJECTS\whatsApp CRM\frontEnd_K\front\src\redux\slices\authSlice.js
const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to get the current location
  const [selectedPath, setSelectedPath] = useState(location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  // Update selected path when route changes
  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location]);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleProfileMenuClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };
  return (
    <div style={{ width: "100vw", margin: 0, padding: 0 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "card.background", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", sm: "none", color: "green" } }} // Visible on small screens
            onClick={handleMenuClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            {navBars.map((button) => (
              <MenuItem
                key={button.id}
                onClick={handleMenuClose}
                component={Link}
                to={button.path}
              >
                {button.icons}
                {button.label}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          {/* Buttons for larger screens */}
          {navBars.map((button) => {
            const isSelected = button.path === selectedPath;

            return (
              <Button
                key={button.id}
                variant="text"
                size="small"
                aria-label={button.label}
                startIcon={button.icons}
                component={Link} // Use Link instead of "a" tag
                to={button.path} // Use "to" prop instead of "href"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  p: 1,
                  mx: 1,
                  color: isSelected ? "rgb(53, 212, 114)" : "text.primary", // Text color
                  "&:hover": {},
                }}
              >
                {button.label}
              </Button>
            );
          })}

          {/*  */}
          {/* Profile picture and profile menu */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            sx={{ ml: "auto" }} // Move to the right on large screens
            onClick={handleProfileMenuClick}
          >
            <Avatar alt="Profile Picture" src="/profile-pic.jpg" />
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
            sx={{ width: 250 }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <FacebookIcon sx={{ mr: 1,color:"rgb(53, 212, 114)" }} /> Meta API keys
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <AccountCircleIcon sx={{ mr: 1,color:"rgb(53, 212, 114)" }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <MonetizationOnIcon sx={{ mr: 1,color:"rgb(53, 212, 114)" }} /> Subscription
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1,color:"rgb(53, 212, 114)" }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div style={{ width: "100%", paddingTop: "10px" }}>{children}</div>
    </div>
  );
};

export default AdminLayout;
