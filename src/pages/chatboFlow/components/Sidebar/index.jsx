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

        <NodeSelection />

        <hr />
      </section>
    </div>
  );
};

export const Sidebar = ({ isSelected, text, textId, setText, setId }) => {
  return (
    <div>
      <div>
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
