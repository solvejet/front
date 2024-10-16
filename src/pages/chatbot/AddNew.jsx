import { Box, Typography, Paper, Button } from "@mui/material";
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
  </svg>
);
export default function AddNew({ setIsAdd }) {
  return (
    <Box
      sx={{
        padding: 2,
        bgcolor: "background.paper", // Uses theme-based background color
        color: "text.primary",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <button onClick={() => setIsAdd(false)}>
      <BackIcon />
      </button>
      <div>Add new screen</div>
    </Box>
  );
}
