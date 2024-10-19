import React from "react";
import { EditMessage } from "./EditMsg";
import { NodeSelection } from "./NodeSelection";

const Component = ({ isSelected, text, textId, setText, setId }) => {
  return (
    <div className=" p-1 h-100">
      <NodeSelection />
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
