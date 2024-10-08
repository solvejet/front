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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tablesData, data } from "../constant/dashboard/dashboardData";
// Sample data (replace with real data)

const Dashboard = () => {
  return (
    <>
      {/* First Chart */}
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
  
      {/* Second Chart and Table */}
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: {
            xs: "column", // Stack vertically on small screens (xs)
            md: "row", // Align side by side on medium+ screens (md)
          },
          alignItems: "center", // Center items in the flex container
          padding: 2,
          width: "100%",
        }}
      >
        {/* Chart */}
        <Box
          sx={{
            width: {
              xs: "100%", // Full width on small screens
              md: "50%", // 50% width on medium+ screens
            },
            m: 1,
          }}
        >
          <Paper sx={{ padding: 2, backgroundColor: "white" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
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
  
        {/* Table */}
        <Box
          sx={{
            width: {
              xs: "100%", // Full width on small screens
              md: "50%", // 50% width on medium+ screens
            },
            m: 1,
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableBody>
                {tablesData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ backgroundColor: "gray" }} />
                        {row.icon}
                      </Box>
                    </TableCell>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.val}</TableCell>
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
