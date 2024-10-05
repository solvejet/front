// src/pages/Dashboard.jsx
import React from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
const users = [
  {
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Jane Smith",
    lastMessage: "Can we meet tomorrow?",
    avatar: "https://via.placeholder.com/40",
  },
];
const chats = {
  "John Doe": [
    { message: "Hey, how are you?", sender: "John Doe", status: "Seen" },
    { message: "I'm good! How about you?", sender: "You", status: "Delivered" },
    { message: "I'm doing well, thanks!", sender: "John Doe", status: "Sent" },
  ],
  "Jane Smith": [
    { message: "Can we meet tomorrow?", sender: "Jane Smith", status: "Seen" },
  ],
};
const Inbox = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setChatMessages(chats[user.name] || []);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: messageInput, sender: "You", status: "Sent" },
      ]);
      setMessageInput("");
    }
  };
  const handleAttachClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the file attach menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the file attach menu
  };

  const handleFileUpload = (fileType) => {
    // Placeholder function for handling file upload by type
    console.log(`File type selected: ${fileType}`);
    handleMenuClose();
  };
  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingTop:"10px",
          height:"85vh"
        }}
      >
        {/* Left Sidebar - 30% */}
        <Box
          sx={{
            flex: "0 0 30%",
            backgroundColor: "#f0f0f0",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography variant="h6">Chats</Typography>
          </Box>

          <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
            <List>
              {users.map((user, index) => (
                <ListItem
                  button
                  key={index}
                  sx={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}
                  onClick={() => handleUserClick(user)}
                >
                  <Avatar
                    alt={user.name}
                    src={user.avatar}
                    sx={{ marginRight: "16px" }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="body1">{user.name}</Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        {user.lastMessage}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Main Chat Area - 70% */}
        <Box
          sx={{
            flex: "0 0 70%",
            backgroundColor: "#e0e0e0",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography variant="h6">
              {selectedUser ? selectedUser.name : "Select a chat"}
            </Typography>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flexGrow: 1,
              padding: "16px",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            {selectedUser &&
              chatMessages.map((chat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      chat.sender === "You" ? "flex-end" : "flex-start",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        chat.sender === "You" ? "#dcf8c6" : "#fff",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      maxWidth: "60%",
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {chat.message}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      {chat.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>

          {/* Message Input Box */}
          {selectedUser && (
            <Box
              sx={{
                padding: "16px",
                backgroundColor: "#fff",
                borderTop: "1px solid #ddd",
                display: "flex",
              }}
            >
              {/* File Attach Button */}
              <IconButton aria-label="attach file" onClick={handleAttachClick}>
                <AttachFileIcon />
              </IconButton>

              {/* Attach File Menu */}
              <Menu
                id="attach-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleFileUpload("Audio")}>
                  Audio
                </MenuItem>
                <MenuItem onClick={() => handleFileUpload("Document")}>
                  Document
                </MenuItem>
                <MenuItem onClick={() => handleFileUpload("Image")}>
                  Image
                </MenuItem>
                <MenuItem onClick={() => handleFileUpload("Video")}>
                  Video
                </MenuItem>
                <MenuItem onClick={() => handleFileUpload("Contact")}>
                  Contact
                </MenuItem>
              </Menu>

              {/* Message Input Field */}
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                sx={{ marginRight: "16px" }}
              />

              {/* Send Button */}
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Inbox;
