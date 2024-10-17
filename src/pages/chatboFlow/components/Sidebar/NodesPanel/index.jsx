import React from "react";

export const NodesPanel = () => {
  const dragStart = (e, nodeType, contentText) => {
    e.dataTransfer.setData("dataType", nodeType);
    e.dataTransfer.setData("label", contentText);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="accordion w-75" id="node-panel">
      <div className="accordion-item bg-body-tertiary">
        <div className="accordion-header">
          <button
            className="accordion-button collapsed shadow-none bg-success-subtle text-success-emphasis"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-panel"
            aria-expanded="true"
            aria-controls="collapse-panel"
          >
            Nodes Panel
          </button>
        </div>
        <div
          id="collapse-panel"
          className="accordion-collapse collapse"
          data-bs-parent="#node-panel"
        >
          <div className="accordion-body">
            <button
              type="button"
              className="btn btn-outline-primary"
              draggable
              onDragStart={(e) => dragStart(e, "customNode", "dummy text")}
            >
              Text message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
