import React, { useMemo, useState } from "react";
import {
  Handle,
  Position,
  getConnectedEdges,
  useNodeId,
  useStore,
} from "reactflow";
import { TextField, IconButton, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useEffect } from "react";

export const CustomNode = ({ data, selected }) => {
  const { setNodes, type } = data;
  const { nodeInternals, edges } = useStore((st) => ({
    nodeInternals: st.nodeInternals,
    edges: st.edges,
  }));
  useEffect(() => {
    console.log(data, "data");
  }, [data]);
  const nodeId = useNodeId();

  const singleSourceConnect = useMemo(() => {
    const node = nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], edges);
    
    return connectedEdges.filter(edge => edge.source === nodeId).length < 2;
  }, [nodeInternals, edges, nodeId]);

  // State to manage the text and additional options
  const [message, setMessage] = useState(data.content || "");
  const [options, setOptions] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // Handlers for message input and options
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    data.content = e.target.value; // Update the content in the node's data
  };
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      data.content = file.name; // Store the file name or actual file in the node's data
    }
  };

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, ""]);
  };
  const removeOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const removeNodeCallback = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  };
  const removeNode = () => {
    // Implement node removal logic
    console.log(`Node ${nodeId} removed`);
    // You would likely use setNodes or equivalent to remove this node from the flow
    if (removeNodeCallback) {
      removeNodeCallback(nodeId);
    }
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Assuming you're saving the file to state
      setImageFile(file);
      // Perform any additional logic, such as validation or uploading to a server
      console.log("Image file selected:", file);
    }
  };
  
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Assuming you're saving the file to state
      setVideoFile(file);
      // Perform any additional logic, such as validation or uploading to a server
      console.log("Video file selected:", file);
    }
  };
  
  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Assuming you're saving the file to state
      setDocumentFile(file);
      // Perform any additional logic, such as validation or uploading to a server
      console.log("Document file selected:", file);
    }
  };
  
  return (
    <div
      className={`card p-1 ${
        selected ? "shadow-lg border border-info" : ""
      } bg-body-tertiary`}
      style={{
        minWidth: "12rem",
        borderRadius: "8px",
        border: "1px solid #f28b82",
      }}
    >
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#f28b82", color: "#fff" }}
      >
        <span>{data.heading}</span>
        <div>
          {/* Delete Button */}
          <IconButton
            size="small"
            onClick={removeNode}
            style={{ color: "#fff" }}
          >
            <DeleteIcon />
          </IconButton>
          {/* Save Button */}
          <IconButton size="small" style={{ color: "#fff" }}>
            <SaveIcon />
          </IconButton>
        </div>
      </div>

      <div className="card-body">
        {/* Conditional rendering based on the type of node */}
        {data.type === "messageNode" ? (
        <>
        <TextField
          label="Type your message"
          value={message}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={2}
          sx={{ marginBottom: "10px" }}
        />
      
        {/* Dynamic option fields */}
        {options.map((option, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <TextField
              label={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              fullWidth
              sx={{ marginRight: "10px" }}
            />
            <IconButton onClick={() => removeOption(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      
        {/* Add option button */}
        <Button
          variant="outlined"
          fullWidth
          sx={{ color: "#f28b82", borderColor: "#f28b82" }}
          onClick={addOption}
        >
          Add option
        </Button>
      </>
      
        ) : data.type === "audioNode" ? (
          <>
            <Typography variant="body1" gutterBottom>
              Upload an audio message:
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#f28b82",
                color: "#fff",
              }}
            >
              {audioFile ? audioFile.name : "Choose Audio"}
              <input
                type="file"
                hidden
                onChange={handleAudioUpload}
                accept="audio/*"
              />
            </Button>
          </>
        ) : data.type === "imageNode" ? (
          <>
            <Typography variant="body1" gutterBottom>
              Upload an image:
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#f28b82",
                color: "#fff",
              }}
            >
              {imageFile ? imageFile.name : "Choose Image"}
              <input
                type="file"
                hidden
                onChange={handleImageUpload}
                accept="image/*"
              />
            </Button>
          </>
        ) : data.type === "videoNode" ? (
          <>
            <Typography variant="body1" gutterBottom>
              Upload a video:
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#f28b82",
                color: "#fff",
              }}
            >
              {videoFile ? videoFile.name : "Choose Video"}
              <input
                type="file"
                hidden
                onChange={handleVideoUpload}
                accept="video/*"
              />
            </Button>
          </>
        ) : data.type === "documentNode" ? (
          <>
            <Typography variant="body1" gutterBottom>
              Upload a document:
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#f28b82",
                color: "#fff",
              }}
            >
              {documentFile ? documentFile.name : "Choose Document"}
              <input
                type="file"
                hidden
                onChange={handleDocumentUpload}
                accept="application/*"
              />
            </Button>
          </>
        ) : null}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="h-2"
        isConnectable={singleSourceConnect}
      />
      <Handle type="target" position={Position.Top} id="h-1" />
    </div>
  );
};
