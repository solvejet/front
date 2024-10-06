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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const chartData = [
  { name: "Jan", active: 0.5, inactive: 0.3 },
  { name: "Feb", active: 1.0, inactive: 0.5 },
  { name: "Mar", active: 1.2, inactive: 0.7 },
  { name: "Apr", active: 1.5, inactive: 0.8 },
  { name: "May", active: 1.8, inactive: 0.9 },
  { name: "Jun", active: 2.0, inactive: 1.0 },
  { name: "Jul", active: 1.7, inactive: 0.8 },
  { name: "Aug", active: 1.3, inactive: 0.6 },
  { name: "Sep", active: 1.0, inactive: 0.4 },
  { name: "Oct", active: 0.8, inactive: 0.3 },
  { name: "Nov", active: 0.5, inactive: 0.2 },
  { name: "Dec", active: 0.3, inactive: 0.1 },
];
const rows = [
  createData("icon", "Total chats", 1),
  createData("icon", "Total chatbots", 9.0),
  createData("icon", "Total contacts", 16.0),
  createData("icon", "Total chatbots flows", 3.7),
  createData("icon  ", "Total broadcasts", 16.0),
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
      <Box
        sx={{
          display: "flex", // Flex container to arrange the elements side by side
          padding: 2,
          maxWidth: "100%", // Ensures the container width is 100%
          justifyContent: "space-between", // Ensure space is divided evenly
        }}
      >
        {/* Chart - 50% width */}
        <Box
          sx={{
            flex: "1 1 50%", // Take 50% of the width
            m: 1,
          }}
        >
          <Paper sx={{ padding: 2, backgroundColor: "white" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart width={500} height={300} data={data} margin={{}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#0088FE"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="inactive" stroke="#00C49F" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
        {/* Table - 50% width */}
        <Box
          sx={{
            flex: "1 1 50%", // Take 50% of the width
            paddingRight: 2, // Optional: adds spacing between the table and chart
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "50px" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Replace this with your actual icon */}
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: "gray",
                            marginRight: 1,
                          }}
                        />
                        {row.name}
                      </Box>
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
