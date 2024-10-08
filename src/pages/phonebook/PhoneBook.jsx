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
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const PhoneBook = () => {
  const [open, setOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAssignOpen = () => setIsAssignOpen(true);
  const handleAssignClose = () => setIsAssignOpen(false);
  const columns = [
    { field: "customerId", headerName: "Customer ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: true,
    },
    {
      field: "customerNumber",
      headerName: "Customer No.",
      width: 250,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At?",
      // type: "number",
      width: 250,
      editable: true,
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      renderCell: (params) => {
        const [value, setValue] = useState(params.value);

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{value}</span>
            <span style={{ margin: "0px 10px", fontSize: "1.5rem" }}>|</span>
            <IconButton
              size="small"
              onClick={handleAssignOpen}
              style={{ marginLeft: 8 }}
            >
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: 0,
      customerId: "1",
      name: "Parth Banker",
      customerNumber: "918469725997",
      createdAt: "2024-02-08 20:47:59",
      assignedTo: "Test User ",
    },
  ];
  return (
    <Box sx={{}}>
      <AddModal open={open} handleClose={handleClose} />
      <AssignModal
        isAssignOpen={isAssignOpen}
        handleAssignClose={handleAssignClose}
      />
      <Box
        sx={{
          padding: 2,
          bgcolor: "background.paper", // Uses theme-based background color
          color: "text.primary",
          borderRadius: "8px",
          boxShadow: 3,
          margin: "0 auto",
          width: "100%",
          m: 1,
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          onClick={handleOpen}
          variant="text"
          size="small"
          component={Link}
          sx={{
            display: { xs: "none", sm: "flex" },
            p: 2,
            mx: 1,
            color: "text.primary",
            "&:hover": {},
            bgcolor: "rgb(53, 212, 114)",
          }}
        >
          Add Contact
        </Button>
      </Box>
      <Box
        sx={{
          padding: 2,
          bgcolor: "background.paper", // Uses theme-based background color
          color: "text.primary",
          borderRadius: "8px",
          boxShadow: 3,
          margin: "0 auto",
          width: "100%",
          m: 1,
          p: 2,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="left"
          gutterBottom
        >
          Contact Management
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </Box>
  );
};
export default PhoneBook;

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

function AddModal({ open, handleClose }) {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
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
            Add Contact
          </Typography>
          <Typography
            id="modal-modal-description"
            align="center"
            variant="body2"
            gutterBottom
          >
            Add a new customer contact
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            {/* Name Field */}
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
            />

            {/* Phone Number Field */}
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
            />

            {/* Group Select Field */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="group-select-label">Group</InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                label="Group"
              >
                <MenuItem value={10}>Group 1</MenuItem>
                <MenuItem value={20}>Group 2</MenuItem>
                <MenuItem value={30}>Group 3</MenuItem>
              </Select>
            </FormControl>

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
function AssignModal({ isAssignOpen, handleAssignClose }) {
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
}
