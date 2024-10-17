import React from "react";
import { EditMessage } from "./EditMsg";
import { NodeSelection } from "./NodeSelection";

const Component = ({ isSelected, text, textId, setText, setId }) => {
  return (
    <div className="bg-body-secondary p-1 h-100">
      <header className="bg-primary-subtle p-2 rounded text-primary-emphasis mb-4">
        <h4 className="text-center">{isSelected ? "Edit" : "Nodes"} Panel</h4>
      </header>
      <section className="p-2 text-info-emphasis">
        <hr />
        {isSelected ? (
          <EditMessage
            value={text}
            textId={textId}
            setId={setId}
            setText={setText}
          />
        ) : (
          <NodeSelection />
        )}
        <hr />
      </section>
    </div>
  );
};

export const Sidebar = ({ isSelected, text, textId, setText, setId }) => {
  return (
    <div>
      <div
        className="position-absolute border rounded overflow-hidden d-none d-lg-block"
        style={{ right: "2rem", top: "5rem", bottom: "5rem", width: "20rem" }}
      >
        <Component
          isSelected={isSelected}
          text={text}
          textId={textId}
          setText={setText}
          setId={setId}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary position-absolute start-50 d-lg-none"
        style={{ bottom: "2rem", transform: "translateX(-50%)" }}
        data-bs-toggle="offcanvas"
        data-bs-target="#barBottom"
        aria-controls="barBottom"
      >
        Add node
      </button>
      <div
        className={`offcanvas offcanvas-bottom d-lg-none h-50 ${
          isSelected && "show"
        }`}
        tabIndex="-1"
        id="barBottom"
        aria-labelledby="barBottomLabel"
      >
        <Component
          isSelected={isSelected}
          text={text}
          textId={textId}
          setText={setText}
          setId={setId}
        />
      </div>
    </div>
  );
};
