// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector
import LoginPage from "./pages/Login";
import { ThemeContextProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/inbox/Inbox";
import ThemeToggleButton from "./components/ThemeToggleButton";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import RouterPaths from "./route.paths";
import ChatBot from "./pages/chatbot/ChatBot";
import ChatBotFlow from "./pages/chatboFlow/ChatBotFlow";
import PhoneBook from "./pages/phonebook/PhoneBook";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get auth state

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        {/* navBar */}
        {isAuthenticated && <AdminLayout />}
        <div>
          <Routes>
            <Route
              path={RouterPaths.LOGIN}
              element={
                isAuthenticated ? (
                  <Navigate to={RouterPaths.DASHBOARD} />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path={RouterPaths.DASHBOARD}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={RouterPaths.INBOX}
              element={
                <ProtectedRoute>
                  <Inbox />
                </ProtectedRoute>
              }
            />
            <Route
              path={RouterPaths.CHATBOT}
              element={
                <ProtectedRoute>
                  <ChatBot />
                </ProtectedRoute>
              }
            />
            <Route
              path={RouterPaths.CHATBOT_FLOW}
              element={
                <ProtectedRoute>
                  <ChatBotFlow />
                </ProtectedRoute>
              }
            />
            <Route
              path={RouterPaths.PHONEBOOK}
              element={
                <ProtectedRoute>
                  <PhoneBook />
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
