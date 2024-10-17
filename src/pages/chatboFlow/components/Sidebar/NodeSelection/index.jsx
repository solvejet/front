import React from "react";
import { NodesPanel } from "../NodesPanel";

export const NodeSelection = () => {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <h5>Select a node to edit the text message</h5>
      <hr className="w-100" />
      <h5 className="text-decoration-underline">Or</h5>
      <h5>drag from below panel to add a new node</h5>
      <NodesPanel />
    </div>
  );
};
