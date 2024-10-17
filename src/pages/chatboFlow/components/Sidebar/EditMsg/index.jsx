import React, { useState } from "react";
import { useReactFlow } from "reactflow";

export const EditMessage = ({ value, textId, setText, setId }) => {
  const { setNodes } = useReactFlow();
  const [isSaved, setIsSaved] = useState(null);
  const onTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const submitText = () => {
    setNodes((nodes) => {
      const obj = nodes?.find((each) => each.id === textId);
      let arr = nodes.filter((each) => each !== obj);
      if (obj) {
        obj.data.content = value;
        setIsSaved({
          mode: "success",
          text: "Message has been changed successfully",
        });
        return [...arr, obj];
      } else {
        setIsSaved({
          mode: "error",
          text: "Something went wrong! Please try later",
        });
        return nodes;
      }
    });
  };
  return (
    <div className="d-grid gap-0 row-gap-3">
      <div className="w-75 justify-self-center">
        <label htmlFor="edit-box" className="form-label">
          <h5>Edit Message:</h5>
        </label>
        <textarea
          className={`form-control ${value === "" && "border border-danger"}`}
          id="edit-box"
          rows="3"
          style={{ resize: "none" }}
          value={value}
          onChange={onTextChange}
          onClick={() => setIsSaved(null)}
        ></textarea>
      </div>
      <button
        type="submit"
        onClick={submitText}
        className="btn btn-outline-primary"
        disabled={value === "" && true}
      >
        Submit
      </button>
      {isSaved && (
        <div
          className={`alert alert-${isSaved?.mode} text-center`}
          role="alert"
        >
          {isSaved?.text}
        </div>
      )}
      <hr />
      <h5 className="text-center">
        To add a new node, deselect the current one
      </h5>
    </div>
  );
};
