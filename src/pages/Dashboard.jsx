// src/pages/Dashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactsIcon from "@mui/icons-material/Contacts";
import FlowIcon from "@mui/icons-material/DeviceHub";
import BroadcastIcon from "@mui/icons-material/Cast";

// Sample data (replace with real data)
const data = [
  { name: "Jan", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Feb", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Mar", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Apr", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "May", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Jun", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Jul", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Aug", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Sep", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Oct", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Nov", Opened: 0, Pending: 0, Resolved: 0 },
  { name: "Dec", Opened: 0, Pending: 0, Resolved: 0 },
];
const data2 = [
  { label: "Total chats", icon: <ChatIcon /> },
  { label: "Total chatbots", icon: <SettingsIcon /> },
  { label: "Total contacts", icon: <ContactsIcon /> },
  { label: "Total chatbot flows", icon: <FlowIcon /> },
  { label: "Total broadcasts", icon: <BroadcastIcon /> },
];
const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 3,
          width: "80%",
          margin: "0 auto",
        }}
      >
        <ResponsiveContainer width="100%" height={330}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Opened" stroke="#007bff" />
            <Line type="monotone" dataKey="Pending" stroke="#28a745" />
            <Line type="monotone" dataKey="Resolved" stroke="#ffc107" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/*  */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {data2.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>
                    {item.label}
                  </Typography>
                </Box>
                <Box>
                  {/* You can add other elements here if needed */}
                  <ChatIcon />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
