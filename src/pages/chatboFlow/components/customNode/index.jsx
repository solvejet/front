import React, { useMemo } from "react";
import {
  Handle,
  Position,
  getConnectedEdges,
  useNodeId,
  useStore,
} from "reactflow";

export const CustomNode = ({ data, selected }) => {
  const { nodeInternals, edges } = useStore((st) => ({
    nodeInternals: st.nodeInternals,
    edges: st.edges,
  }));

  const nodeId = useNodeId();

  const singleSourceConnect = useMemo(() => {
    const node = nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], edges);

    return connectedEdges.length < 1;
  }, [nodeInternals, edges, nodeId]);

  return (
    <div
      className={`card p-1 ${
        selected && "shadow-lg border border-info"
      } bg-body-tertiary`}
      style={{ minWidth: "12rem" }}
    >
      <div className="card-header text-center bg-info-subtle text-info-emphasis fw-bold">
        {data.heading}
      </div>
      <div className="card-body">{data.content}</div>
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
