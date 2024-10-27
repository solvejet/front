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
import { getAdminList } from "../../../../api/admin/getAdminList";
import Loader from "../../../../components/loader/Loader";
import SnackbarAlert from "../../../../components/snackbar/SnackbarAlert ";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const [loader, setLoader] = useState(false);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    setLoader(true);
    const getData = async () => {
      const token = localStorage.getItem("token");
      const { data, error } = await getAdminList(token);
      if (error) {
        const errorMessage =
          error?.response?.data?.error?.message ||
          error?.message ||
          "Something went wrong";
        setSnackbarSeverity("error");
        setSnackbarMessage(errorMessage);
      } else {
        setAdmins(data?.admins);
      }
    };
    setLoader(false);

    getData();
  }, []);
  return (
    <Box>
      {loader && <Loader />}
      <SnackbarAlert
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
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
              <InputLabel id="group-select-label">Admin</InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                label="Group"
              >
                {admins?.map((admin, idx) => {
                  return (
                    <MenuItem key={idx} value={10}>
                      {admin?.username}
                    </MenuItem>
                  );
                })}
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
