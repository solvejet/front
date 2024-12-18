// src/pages/Dashboard.jsx
import React, { useEffect, useRef } from "react";
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
import { getUserList } from "../../api/users/getUserList";
import Loader from "../../components/loader/Loader";
import SnackbarAlert from "../../components/snackbar/SnackbarAlert ";
import useTokenExpirationCheck from "../../hooks/useTokenExpirationCheck";
import { getMessages } from "../../api/Whatsapp/getMessages";

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
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useTokenExpirationCheck();
  const chatContainerRef = useRef(null); // Ref to the chat container
  const userList = async () => {
    const token = localStorage.getItem("token");
    setLoader(true);
    const { data, error } = await getUserList(token);
    const users = data?.users;
    // console.log(data, "123123");
    if (!error) {
      const transformedData = users.map((user) => ({
        name: user.name || "Unknown Name",
        lastMessage: "No message", // Default message string
        avatar: "https://via.placeholder.com/40", // Default avatar URL
        _id: user._id || "",
        number: user.number || "",
        assignedAdmin:
          user.assignedAdmin !== null ? user.assignedAdmin : "Not assigned",
        status: user.status || "",
        metadata: user.metadata ? JSON.stringify(user.metadata) : "{}", // Stringified metadata
        createdAt: user.createdAt || "",
        updatedAt: user.updatedAt || "",
        __v: user.__v !== undefined ? user.__v.toString() : "",
      }));
      setUsers(transformedData);
      console.log(transformedData, "transformedData");
      setLoader(false);
    } else {
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Something went wrong";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setLoader(false);
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]); // Dependency array includes chatMessages
  useEffect(() => {
    userList();
  }, []);

  const handleUserClick = async (user) => {
    console.log(user);
    setLoader(true);
    const { _id } = user || {};
    const token = localStorage.getItem("token");
    const { data, error } = await getMessages(token, _id);

    if (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Something went wrong";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setLoader(false);
    } else {
      // two data?.data is send from API call to destructure messages and message also includes messages : data format in above json file for future reference
      const { messages } = data || {};
      const transformedMessages = messages?.messages
        .map((message) => {
          const isTextMessage = message.type === "TEXT";
          const dateTime = new Date(message.createdAt);
          const formattedTime = dateTime.toLocaleTimeString();
          const formattedDate = dateTime.toLocaleDateString();

          // Determine if the message date is today, yesterday, or earlier
          const today = new Date();
          const isToday = dateTime.toDateString() === today.toDateString();
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          const isYesterday =
            dateTime.toDateString() === yesterday.toDateString();

          // Custom date label logic
          let dateLabel = formattedDate; // Default to formatted date
          if (isToday) {
            dateLabel = "Today";
          } else if (isYesterday) {
            dateLabel = "Yesterday";
          } else {
            // Use the weekday name for earlier messages
            dateLabel = dateTime.toLocaleDateString(undefined, {
              weekday: "long",
            });
          }

          return {
            message: isTextMessage
              ? message.content.text
              : renderMedia(
                  message.metadata.originalRequest.content.mediaUrl,
                  message.metadata.originalRequest.content.mediaType
                ),
            sender: message.direction === "OUTBOUND" ? "You" : "Other",
            status: message.status,
            date: dateTime, // Use Date object for sorting
            dateLabel, // Use the custom date label for display
            time: formattedTime,
          };
        })
        .sort((a, b) => a.date - b.date) // Sort messages by date and time
        .map((message) => ({
          ...message,
          time: message.time, // Use formatted time for display
          dateLabel: message.dateLabel, // Use custom date label for display
        }));

      // const transformedMessages = messages?.messages.map((msg) => ({
      //   id: msg._id,
      //   content: msg.content?.text || msg.content?.mediaType || "Unknown content",
      //   sender: msg.direction === "OUTBOUND" ? "You" : user.name,
      //   status: msg.status,
      //   time: new Date(msg.createdAt).toLocaleTimeString(), // Format the timestamp
      //   media: msg.content?.url || null,
      //   mediaType: msg.content?.mediaType || null,
      // })).sort((a, b) => new Date(a.time) - new Date(b.time));
      setChatMessages(transformedMessages);
      // console.log(transformedMessages, "transformedMessages");
      setLoader(false);
    }

    setSelectedUser(user);
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
  const renderMedia = (media, mediaType) => {
    if (mediaType === "image") {
      return (
        <img
          src={media}
          alt="Image"
          style={{ maxWidth: "100%", maxHeight: "400px" }}
        />
      );
    }
    if (mediaType === "video") {
      return (
        <video controls style={{ maxWidth: "100%", maxHeight: "400px" }}>
          <source src={media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    if (mediaType === "audio") {
      return (
        <audio controls>
          <source src={media} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      );
    }
    return null; // If there's no media or unknown type, return null
  };
  const lsetMessageObject = chatMessages[chatMessages.length - 1];
  const lastMessage =
    lsetMessageObject?.type === "TEXT" ? lsetMessageObject.message : "Media";

  useEffect(() => {
    return () => setSelectedUser(null);
  }, []);
  return (
    <>
      {loader && <Loader />}
      <SnackbarAlert
        open={snackbarOpen}
        // handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "85vh",
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
                  sx={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #ddd",
                    backgroundColor:
                      selectedUser?._id === user._id
                        ? "#e0f7fa"
                        : "transparent", // Highlight selected
                    "&:hover": {
                      backgroundColor:
                        selectedUser?._id === user._id ? "#b2ebf2" : "#f5f5f5", // Hover effect for selected item
                    },
                  }}
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
                        {lastMessage}
                        {/* {user.lastMessage} */}
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
            ref={chatContainerRef}
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
                      {typeof chat.message === "string"
                        ? chat.message
                        : chat.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "gray",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ fontSize: "0.75rem" }}>{chat.dateLabel}</Box>{" "}
                      {/* Smaller text for date */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{chat.time}</span>
                        {chat.sender === "You" && (
                          <span>• {chat.status}</span>
                        )}{" "}
                        {/* Delivered spaced out */}
                      </Box>
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
    </>
  );
};

export default Inbox;
