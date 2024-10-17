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

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = rfInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      setNodes((node) =>
        node.concat({
          id: generateId(),
          type: type,
          position: position,
          data: {
            heading: "Send Message",
            content: label,
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
    <div className="container">
      <ReactFlowProvider>
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

        <SaveBtn />
        <div
          style={{ position: "absolute", top: "20px", right: "-105px" }}
          onClick={toggleDrawer}
        >
          click me
        </div>
        {/*  */}
        <Box
          sx={{
            padding: 2,
            bgcolor: "background.paper", // Uses theme-based background color
            color: "text.primary",
            borderRadius: "8px",
            boxShadow: 3,
            margin:"auto"
          }}
        >
          <Drawer
            anchor="right"
            open={isDrawer}
            onClose={() => toggleDrawer()}
            sx={{
              "& .MuiDrawer-paper": {
                width: "40%", // Set the width to 40% of the screen
                minWidth: "40vw", // Ensure it takes a minimum of 40% of the viewport width
              },
            }}
          >
            <div>Some Content</div>
            <Sidebar
              isSelected={isSelected}
              text={editText}
              setText={setEditText}
              textId={id}
              setId={setId}
            />
          </Drawer>
        </Box>
      </ReactFlowProvider>
    </div>
  );
};
export default ChatBotFlow;
