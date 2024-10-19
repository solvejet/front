import React from "react";
import { Button } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const NodesPanel = () => {
  const dragStart = (e, nodeType, contentText) => {
    e.dataTransfer.setData("dataType", nodeType);
    e.dataTransfer.setData("label", contentText);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="accordion w-100" id="node-panel">
      {/* Messages Section */}
      <div className="accordion-item" style={{ margin: "10px" }}>
        <div className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-panel-messages"
            aria-expanded="true"
            aria-controls="collapse-panel-messages"
          >
            <span>Messages</span>
          </button>
        </div>
        <div
          id="collapse-panel-messages"
          className="accordion-collapse collapse"
          data-bs-parent="#node-panel"
        >
          <div className="accordion-body d-flex flex-column">
            <Button
              startIcon={<TextFieldsIcon />}
              variant="contained"
              style={{ backgroundColor: "#f87171", margin: "5px" }}
              draggable
              onDragStart={(e) => dragStart(e, "messageNode", "Simple text")}
            >
              Simple Text
            </Button>
            <Button
              startIcon={<ImageIcon />}
              variant="contained"
              style={{ backgroundColor: "#60a5fa", margin: "5px" }}
              draggable
              onDragStart={(e) => dragStart(e, "imageNode", "Image message")}
            >
              Image Message
            </Button>
            <Button
              startIcon={<AudiotrackIcon />}
              variant="contained"
              style={{ backgroundColor: "#f472b6", margin: "5px" }}
              draggable
              onDragStart={(e) => dragStart(e, "audioNode", "Audio message")}
            >
              Audio Message
            </Button>
            <Button
              startIcon={<VideoLibraryIcon />}
              variant="contained"
              style={{ backgroundColor: "#93c5fd", margin: "5px" }}
              draggable
              onDragStart={(e) => dragStart(e, "videoNode", "Video message")}
            >
              Video Message
            </Button>
            <Button
              startIcon={<InsertDriveFileIcon />}
              variant="contained"
              style={{ backgroundColor: "#34d399", margin: "5px" }}
              draggable
              onDragStart={(e) =>
                dragStart(e, "documentNode", "Document message")
              }
            >
              Document Message
            </Button>
            <Button
              startIcon={<SmartButtonIcon />}
              variant="contained"
              style={{ backgroundColor: "#fb923c", margin: "5px" }}
              draggable
              onDragStart={(e) => dragStart(e, "buttonNode", "Button message")}
            >
              Button Message
            </Button>
            <Button
              startIcon={<FormatListBulletedIcon />}
              variant="contained"
              style={{ backgroundColor: "#818cf8", margin: "5px" }}
              draggable
              onDragStart={(e) => dragStart(e, "listNode", "List message")}
            >
              List Message
            </Button>
          </div>
        </div>
      </div>

      {/* 2nd Accordion (Actions) */}
      <div
        className="accordion-item"
        style={{ margin: "10px" }}
      >
        <div className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-panel-actions"
            aria-expanded="true"
            aria-controls="collapse-panel-actions"
          >
            Actions
          </button>
       
        </div>
        <div
          id="collapse-panel-actions"
          className="accordion-collapse collapse"
          data-bs-parent="#node-panel"
        >
          <div className="accordion-body">
            <button
              type="button"
              className="btn btn-outline-primary m-1"
              draggable
              onDragStart={(e) => dragStart(e, "customNode", "Assign Chat")}
            >
              Assign Chat To Agent
            </button>
            <button
              type="button"
              className="btn btn-outline-primary m-1"
              draggable
              onDragStart={(e) => dragStart(e, "customNode", "Disable Chat")}
            >
              Disable Chat Till
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
