import React, { useCallback, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { Box, Typography, Paper, Button, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tablesData, data } from "../constant/dashboard/dashboardData";
// Sample data (replace with real data)
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import RouterPaths from "../route.paths";
import { logoutUser } from "../redux/slices/authSlice";
import useTokenExpirationCheck from "../hooks/useTokenExpirationCheck";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  // useEffect(() => {
  //   const checkTokenExpiration = () => {
  //     const token = localStorage.getItem("token"); // assuming the token is stored in localStorage

  //     if (!token) {
  //       // No token available, redirect to login
  //       navigate(RouterPaths.LOGIN);
  //       return;
  //     }

  //     try {
  //       const decoded = jwtDecode(token);
  //       const currentTime = Date.now() / 1000; // Current time in seconds

  //       if (decoded.exp < currentTime) {
  //         // Token expired, clear the token and redirect to login
  //         localStorage.removeItem("token");
  //         dispatch(logoutUser());
  //       }
  //     } catch (error) {
  //       console.error("Token decoding error:", error);
  //       // In case the token is invalid, redirect to login
  //       navigate(RouterPaths.LOGIN);
  //     }
  //   };

  //   checkTokenExpiration();
  // }, [navigate]);
  useTokenExpirationCheck();

  return (
    <>
      {/* First Chart */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: theme.palette.background.paper, // Adjust for dark mode
          borderRadius: "8px",
          boxShadow: 3,
          width: "80%",
          margin: "0 auto",
          position: "relative", // For positioning buttons
        }}
      >
        {/* Zoom and Download Buttons */}
        {/* <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          <Button variant="outlined" onClick={()=>{}}>
            Zoom In
          </Button>
          <Button variant="outlined" onClick={()=>{}}>
            Zoom Out
          </Button>
          <Button variant="outlined" onClick={()=>{}}>
            Download
          </Button>
        </Box> */}

        <ResponsiveContainer width="100%" height={330}>
          <LineChart data={data}>
            <CartesianGrid
              stroke={theme.palette.divider}
              strokeDasharray="3 3"
            />
            <XAxis dataKey="name" stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip
              contentStyle={{ backgroundColor: theme.palette.background.paper }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Opened"
              stroke={theme.palette.primary.main}
            />
            <Line
              type="monotone"
              dataKey="Pending"
              stroke={theme.palette.success.main}
            />
            <Line
              type="monotone"
              dataKey="Resolved"
              stroke={theme.palette.warning.main}
            />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
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
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis dataKey="name" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="active"
                stroke={theme.palette.primary.main}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="inactive"
                stroke={theme.palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
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
