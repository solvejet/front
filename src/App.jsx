// src/App.jsx
import React, { useCallback, useEffect } from "react";
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
import Templates from "./pages/templates/Templates";
import Home from "./pages/templates/Home";
import Media from "./pages/media/Media";


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get auth state
  // Run the check when the component mounts
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
            <Route
              path={RouterPaths.TEMPLATES}
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={RouterPaths.TEMPLATES_CREATE}
              element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              }
            />
            <Route
              path={RouterPaths.MEDIA}
              element={
                <ProtectedRoute>
                  <Media />
                </ProtectedRoute>
              }
            />
            {/* Redirect from the root path */}
            <Route path="/" element={<Navigate to={RouterPaths.DASHBOARD} />} />
            {/* Catch-all route for invalid paths */}
            <Route path="*" element={<Navigate to={RouterPaths.LOGIN} />} />
          </Routes>
          <ThemeToggleButton />
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
