import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarAlert = ({ open, handleClose, severity, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
