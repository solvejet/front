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
import { useState, useEffect, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userColumns } from "../../api/users/columns/getColumns";
import { getUserList } from "../../api/users/getUserList";
import { useTable } from "react-table";
const generateColumnsFromSchema = (schema) => {
  return Object.keys(schema).map((key) => ({
    Header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the header
    accessor: key, // Set the accessor to the key
    Cell: ({ cell }) => {
      return cell.value !== undefined ? cell.value : "null"; // Show 'null' if the value is missing
    },
  }));
};

const PhoneBook = () => {
  const [open, setOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAssignOpen = () => setIsAssignOpen(true);
  const handleAssignClose = () => setIsAssignOpen(false);
  const [columns, setColumns] = useState([]); // State for table columns
  const [tableData, setTableData] = useState([]);
  const [schema, setSchema] = useState({}); // State for the schema object
  // const columns = [
  //   { field: "customerId", headerName: "Customer ID", width: 250 },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 250,
  //     editable: true,
  //   },
  //   {
  //     field: "customerNumber",
  //     headerName: "Customer No.",
  //     width: 250,
  //     editable: true,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "Created At?",
  //     // type: "number",
  //     width: 250,
  //     editable: true,
  //   },
  //   {
  //     field: "assignedTo",
  //     headerName: "Assigned To",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 250,
  //     renderCell: (params) => {
  //       const [value, setValue] = useState(params.value);

  //       return (
  //         <div style={{ display: "flex", alignItems: "center" }}>
  //           <span>{value}</span>
  //           <span style={{ margin: "0px 10px", fontSize: "1.5rem" }}>|</span>
  //           <IconButton
  //             size="small"
  //             onClick={handleAssignOpen}
  //             style={{ marginLeft: 8 }}
  //           >
  //             <EditIcon />
  //           </IconButton>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const handleAddContact = (e) => console.log(e);
  // const rows = [
  //   {
  //     id: 0,
  //     customerId: "1",
  //     name: "Parth Banker",
  //     customerNumber: "918469725997",
  //     createdAt: "2024-02-08 20:47:59",
  //     assignedTo: "Test User ",
  //   },
  // ];
  const tableColumns = useMemo(() => columns, [columns]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data: tableData,
    });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    console.log(decoded, rows);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getColumns = async () => {
      const response = await userColumns(token);
      console.log(response);
      const schemaData = response?.schema || {};
      setSchema(schemaData); // Store schema in state
      setColumns(generateColumnsFromSchema(schemaData)); // Generate columns based on schema
    };
    const userList = async () => {
      const response = await getUserList(token);
      console.log(response);
      setTableData(response?.users || []);
    };
    getColumns();
    userList();
  }, []);
  return (
    <Box sx={{}}>
      <AddModal
        open={open}
        handleClose={handleClose}
        handleAddContact={handleAddContact}
      />
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
        {/* <DataGrid
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
        /> */}
        <table
          {...getTableProps()}
          style={{ width: "100%", border: "1px solid black" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{ padding: "10px", borderBottom: "1px solid black" }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid black",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
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

const AddModal = ({ open, handleClose, handleAddContact }) => {
  const [addContact, setAddContact] = useState({
    name: "",
    phNumber: "",
    group: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!addContact.name) newErrors.name = "Name is required";
    if (!addContact.phNumber) newErrors.phNumber = "Phone Number is required";
    if (!addContact.group) newErrors.group = "Group is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phNumber" && Number(value) < 0) {
      return; // Do not update the state for negative numbers
    }
    setAddContact({ ...addContact, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddContact(addContact);
      // Reset the form state after submission
      setAddContact({
        name: "",
        phNumber: "",
        group: "",
      });
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-contact-modal"
    >
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>
          Add Contact
        </Typography>
        <Typography align="center" variant="body2" gutterBottom>
          Add a new customer contact
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={addContact.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phNumber"
            value={addContact.phNumber}
            onChange={handleChange}
            error={!!errors.phNumber}
            helperText={errors.phNumber}
            margin="normal"
            variant="outlined"
            type="number" // Set the input type to number
            InputProps={{ inputProps: { min: 0 } }}
          />
          <FormControl fullWidth margin="normal" error={!!errors.group}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              name="group"
              value={addContact.group}
              onChange={handleChange}
              label="Group"
            >
              <MenuItem value={"Group 1"}>Group 1</MenuItem>
              <MenuItem value={"Group 2"}>Group 2</MenuItem>
              <MenuItem value={"Group 3"}>Group 3</MenuItem>
            </Select>
            {errors.group && (
              <Typography color="error">{errors.group}</Typography>
            )}
          </FormControl>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
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
