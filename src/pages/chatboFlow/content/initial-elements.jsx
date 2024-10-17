export const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 500, y: 300 },
    data: { heading: "Send Message", content: "text message 1" },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 700, y: 500 },
    data: { heading: "Send Message", content: "text message 2" },
  },
];

export const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
