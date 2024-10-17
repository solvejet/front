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

export const CustomNode = ({ data, selected }) => {
  const { setNodes, content, type } = data;
  const { nodeInternals, edges } = useStore((st) => ({
    nodeInternals: st.nodeInternals,
    edges: st.edges,
  }));

  const nodeId = useNodeId();

  // Ensure only one source connection per node
  const singleSourceConnect = useMemo(() => {
    const node = nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], edges);
    return connectedEdges.length < 1;
  }, [nodeInternals, edges, nodeId]);

  // State to manage the text and additional options
  const [message, setMessage] = useState(data.content || "");
  const [options, setOptions] = useState([]);
  const [audioFile, setAudioFile] = useState(null);

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
        {data.type === "text" ? (
          <>
            {/* Text Message Input */}
            <TextField
              label="Type your message"
              value={message}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              sx={{ marginBottom: "10px" }}
            />

            {/* Render dynamic options */}
            {options.map((option, index) => (
              <TextField
                key={index}
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
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
        ) : (
          <>
            {/* Audio Upload for Audio Node */}
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
        )}
      </div>

      {/* Handles for connecting nodes */}
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
