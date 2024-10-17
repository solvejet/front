import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "./ChatBotFlow.css";
import Drawer from "@mui/material/Drawer";

import "reactflow/dist/style.css";
import { SaveBtn } from "./components/SaveChanges";
import { Sidebar } from "./components/Sidebar";
import { CustomNode } from "./components/customNode";
import { initialEdges, initialNodes } from "./content/initial-elements";
import { Box, Typography, Paper, Button } from "@mui/material";

const nodeTypes = { customNode: CustomNode };

let id = 1;
const generateId = () => `dropId_${id++}`;
const ChatBotFlow = () => {
  const rfWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [rfInstance, setRfInstance] = useState(null);
  const [editText, setEditText] = useState("");
  const [id, setId] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleDrawer = () => setIsDrawer(!isDrawer);

  useEffect(() => {
    const isSelected = nodes.some((each) => each.selected);
    setIsSelected(isSelected);
  }, [nodes]);

  const onNodeClick = (e, node) => {
    setId(node.id);
    setEditText(node.data.content);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("dataType");
      const label = e.dataTransfer.getData("label");

      if (!type) return;

      const position = rfInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      setNodes((node) =>
        node.concat({
          id: generateId(),
          type: "customNode",
          position,
          data: {
            type: type, // Set the node type here
            heading: label,
            content: "", // Empty content by default
          },
        })
      );
    },
    [setNodes, rfInstance]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, id: "50" }, eds)),
    [setEdges]
  );
  return (
    <ReactFlowProvider>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          border: "1px solid blue",
          width: "100%",
        }}
      >
        <Box
          sx={{
            padding: 2,
            bgcolor: "background.paper", // Uses theme-based background color
            color: "text.primary",
            borderRadius: "8px",
            boxShadow: 3,
            margin: "auto",
            width: "70%",
            height: "85vh",
            border: "1px solid red",
          }}
        >
          <ReactFlow
            ref={rfWrapper}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={setRfInstance}
          >
            <Controls position="top-left" />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </Box>

        {/* <SaveBtn /> */}
        {/* <div
          style={{ position: "absolute", top: "20px", right: "-105px" }}
          onClick={toggleDrawer}
        >
          click me
        </div> */}
        {/*  */}
        <Box
          sx={{
            padding: 2,
            bgcolor: "background.paper", // Uses theme-based background color
            color: "text.primary",
            borderRadius: "8px",
            boxShadow: 3,
            margin: "auto",
            width: "30%",
            border: "1px solid red",
          }}
        >
          <Sidebar
            isSelected={isSelected}
            text={editText}
            setText={setEditText}
            textId={id}
            setId={setId}
          />
        </Box>
      </Box>
    </ReactFlowProvider>
  );
};
export default ChatBotFlow;
