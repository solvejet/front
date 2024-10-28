import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  MiniMap,
  useReactFlow,
} from "reactflow";
import "./ChatBotFlow.css";

import "reactflow/dist/style.css";
import { SaveBtn } from "./components/SaveChanges";
import { Sidebar } from "./components/Sidebar";
import { CustomNode } from "./components/customNode";
import { initialEdges, initialNodes } from "./content/initial-elements";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useMemo } from "react";

const initialNode = [
  {
    id: "id",
    position: { x: 1, y: 1 },
    data: {
      amount: 100,
    },
    type: "paymentInit",
  },
];
const sampleNodesType = {
  type1: "call your component here",
};

let id = 1;
const generateId = () => `dropId_${id++}`;
function Flow(props) {
  // you can access the internal state here
  const reactFlowInstance = useReactFlow();

  return <ReactFlow {...props} />;
}
const ChatBotFlow = () => {
  const rfWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const [editText, setEditText] = useState("");
  const [id, setId] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  // const { getNodes, getEdges ,setNodes} = useReactFlow();
  const toggleDrawer = () => setIsDrawer(!isDrawer);

  const nodeTypes = useMemo(
    () => ({
      customNode: (props) => <CustomNode {...props} setNodes={setNodes} />,
    }),
    [setNodes]
  );
  // const nodeTypes = { customNode: CustomNode };

  const [workflowName, setWorkflowName] = useState();
  const [workflows, setWorkflows] = useState([]);

  // Load available workflows from localStorage
  useEffect(() => {
    const savedWorkflows = Object.keys(localStorage).filter((key) =>
      key.startsWith("chatbotFlow_")
    );
    setWorkflows(savedWorkflows);
  }, []);

  // const saveFlow = () => {
  //   const unConnectedNodes = getNodes().filter(
  //     (node) =>
  //       !getEdges().some(
  //         (edge) => edge.source === node.id || edge.target === node.id
  //       )
  //   );
  //   console.log(unConnectedNodes, "unConnectedNodes");

  //   // Check if there are unconnected nodes
  //   if (unConnectedNodes.length === 0) {
  //     const flowData = { nodes, edges };
  //     localStorage.setItem(
  //       `chatbotFlow_${workflowName}`,
  //       JSON.stringify(flowData)
  //     ); // Save to localStorage

  //     // Update the workflow list
  //     setWorkflows((prev) => [
  //       ...new Set([...prev, `chatbotFlow_${workflowName}`]),
  //     ]); // Avoid duplicates

  //     alert("Workflow saved successfully!"); // Success message
  //   } else {
  //     alert("Unable to save: Some nodes are not connected.");
  //   }
  // };
  const deleteFlow = () => {
    if (!workflowName) return;

    localStorage.removeItem(workflowName);
    setWorkflows((prev) =>
      prev.filter((workflow) => workflow !== workflowName)
    );

    // Clear the workflow name in the input after deletion
    setWorkflowName("");
    alert("Workflow deleted successfully!");
  };

  const saveFlow = () => {
    const flowData = { nodes, edges };
    if (!workflowName) {
      alert("Enter flow name");
      return;
    }
    if (nodes.length == 0) {
      alert("Empty flow ");
      return;
    }

    localStorage.setItem(
      `chatbotFlow_${workflowName}`,
      JSON.stringify(flowData)
    ); // Save to localStorage
    // Update the workflow list
    setWorkflows((prev) => [
      ...new Set([...prev, `chatbotFlow_${workflowName}`]),
    ]); // Avoid duplicates
    alert("Flow Saveds");
  };
  const loadFlow = () => {
    const savedFlow = localStorage.getItem(workflowName);
    if (savedFlow) {
      const { nodes: loadedNodes, edges: loadedEdges } = JSON.parse(savedFlow);
      setNodes(loadedNodes);
      setEdges(loadedEdges);
    }
  };

  // const saveFlow = () => {
  //   const flowData = { nodes, edges };
  //   localStorage.setItem("chatbotFlow", JSON.stringify(flowData)); // Save to localStorage
  // };

  // const loadFlow = () => {
  //   const savedFlow = localStorage.getItem("chatbotFlow");
  //   if (savedFlow) {
  //     const { nodes: loadedNodes, edges: loadedEdges } = JSON.parse(savedFlow);
  //     setNodes(loadedNodes);
  //     setEdges(loadedEdges);
  //   }
  // };

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
            setNodes, // Pass the setNodes function to be used in the custom node
            id: generateId(),
          },
        })
      );
    },
    [setNodes, rfInstance]
  );

  const onConnect = useCallback((connection) => {
    setEdges((prevEdges) => {
      const isDuplicate = prevEdges.some(
        (edge) =>
          edge.source === connection.source && edge.target === connection.target
      );
      if (isDuplicate) {
        return prevEdges; // Prevent adding duplicate edges
      }
      const edge = {
        ...connection,
        animated: true,
        id: `${prevEdges.length + 1}`,
      };
      return addEdge(edge, prevEdges);
    });
  }, []);

  return (
    <ReactFlowProvider>
      {/* <Button onClick={saveFlow} variant="contained" color="primary">
        Save Flow
      </Button>
      <Button onClick={loadFlow} variant="contained" color="secondary">
        Load Flow
      </Button> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Enter workflow name"
            style={{ margin: "10px" }}
          />
          <select
            onChange={(e) => setWorkflowName(e.target.value)}
            value={workflowName}
            style={{ margin: "10px" }}
          >
            <option value="">Select a workflow</option>
            {workflows.map((workflow) => (
              <option key={workflow} value={workflow}>
                {workflow.replace("chatbotFlow_", "")}{" "}
                {/* Display name without prefix */}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Button
            onClick={loadFlow}
            variant="contained"
            color="secondary"
            disabled={!workflowName}
            sx={{ margin: "10px" }}
          >
            Load Flow
          </Button>
          <Button
            onClick={saveFlow}
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
          >
            Save Flow
          </Button>
          <Button
            onClick={deleteFlow}
            variant="contained"
            color="error"
            disabled={!workflowName}
            sx={{ margin: "10px" }}
          >
            Delete Flow
          </Button>
          <Button
            onClick={()=>{
              setWorkflowName();
              setNodes([])
              setEdges([])
            }}
            variant="contained"
            // color="error"
            sx={{ margin: "10px" }}
          >
            New Flow
          </Button>
        </div>
      </div>

      {/*  */}
      <Box
        sx={{
          display: "flex",
          gap: "10px",
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
            proOptions={{ hideAttribution: true }}
            fitView
          >
            {/* <MiniMap /> */}
            <Controls position="top-left" />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </Box>

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
            minHeight: "85vh",
            maxHeight: "85vh",
            overflowY: "auto",
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
