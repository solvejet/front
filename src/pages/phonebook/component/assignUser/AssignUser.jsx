import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useMemo } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const AssignModal = ({ isAssignOpen, handleAssignClose }) => {
  return (
    <Box>
      <Modal
        open={isAssignOpen}
        onClose={handleAssignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            gutterBottom
          >
            Assign Contact
          </Typography>
          <Typography
            id="modal-modal-description"
            align="center"
            variant="body2"
            gutterBottom
          >
            Assign a contact to a staff member
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            {/* Name Field */}

            {/* Group Select Field */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="group-select-label">Staff</InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                label="Group"
              >
                <MenuItem value={10}>Staff 1</MenuItem>
                <MenuItem value={20}>Staff 2</MenuItem>
                <MenuItem value={30}>Staff 3</MenuItem>
              </Select>
            </FormControl>

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Assign
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default AssignModal;
