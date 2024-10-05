// src/components/AdminLayout.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { navBars } from "../constant/navBar";
import { useState } from "react";
import RouterPaths from "../route.paths";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const AdminLayout = ({ children }) => {
  const location = useLocation(); // Hook to get the current location
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  // Update selected path when route changes
  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location]);

  return (
    <div style={{ width: "100vw", margin: 0, padding: 0 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "card.background", boxShadow: "none" }}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      <div style={{ width: "100%", paddingTop: "10px" }}>{children}</div>
    </div>
  );
};

export default AdminLayout;
{
  /* <Button component={Link} to="/inbox" sx={{ color: "text.primary" }}>
            Inbox
          </Button>
          <Button
            component={Link}
            to="/admin/users"
            sx={{ color: "text.primary" }}
          >
            Users
          </Button>
          <Button
            component={Link}
            to="/admin/settings"
            sx={{ color: "text.primary" }}
          >
            Settings
          </Button>
          <Button
            component={Link}
            to="/admin/reports"
            sx={{ color: "text.primary" }}
          >
            Reports
          </Button> */
}
