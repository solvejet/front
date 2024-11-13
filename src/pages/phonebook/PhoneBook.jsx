import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userColumns } from "../../api/users/columns/getColumns";
import { getUserList } from "../../api/users/getUserList";
import Loader from "../../components/loader/Loader";
import { createUser } from "../../api/users/createUser";
import { deleteUser } from "../../api/users/deleteUser";
import AddSchema from "./component/addSchema/AddSchema";
import Swal from "sweetalert2";
import AddModal from "./component/addUser/AddUser";
import AssignModal from "./component/assignUser/AssignUser";
import SnackbarAlert from "../../components/snackbar/SnackbarAlert ";

const generateColumnsFromSchema = (schema, setIsAssignOpen) => {
  return Object.keys(schema).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 200, // Increase width for more space
    renderCell: (params) => {
      const value = params.value;
      if (key === "assignedAdmin") {
        return (
          <>
            {value || "NA"}
            <EditIcon
              fontSize="small"
              style={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={() => setIsAssignOpen(true)}
            />
          </>
        );
      }
      if (typeof value === "object" && value !== null) {
        return (
          <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
            {typeof value === "object" && value !== null
              ? Object.entries(value).map(([k, v]) => (
                  <div key={k}>
                    <strong>{k}:</strong> {v}
                  </div>
                ))
              : value !== undefined
              ? value
              : "null"}
          </div>
        );
      }
      return value !== undefined ? value : "null";
    },
    renderHeader: (params) => (
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{ flexGrow: 1 }}
      >
        <Typography variant="body1">{params.colDef.headerName}</Typography>
        {/* <IconButton
          onClick={() => {
            // handleDeleteColumn(key);
          }}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton> */}
      </Stack>
    ),
  }));
};

const PhoneBook = () => {
  const [open, setOpen] = useState(false);
  const [isSchemaModel, setIsSchemaModel] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [inputFields, setInputFields] = useState();
  const [loader, setLoader] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSchemaAddOpen = () => setIsSchemaModel(true);
  const handlSchemaAddClose = () => setIsSchemaModel(false);
  const handleAssignOpen = () => setIsAssignOpen(true);
  const handleAssignClose = () => setIsAssignOpen(false);

  const userList = async (token) => {
    setLoader(true);
    const { data, error } = await getUserList(token);
    // console.log(data, "123123");
    if (!error) {
      const formattedData = data?.users?.map((user, index) => ({
        id: index, // Ensure each row has a unique id
        ...user,
      }));
      // console.log(formattedData, "formattedData");
      setTableData(formattedData || []);
      setLoader(false);
    } else {
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Something went wrong";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setLoader(false);
    }
  };
  // Function to handle deletion of all users in a column
  useEffect(() => {
    console.log(tableData), "tableData";
  }, [tableData, columns]);
  const handleAddContact = async (userData) => {
    const token = localStorage.getItem("token");
    const { data, error } = await createUser(token, userData);
    console.log(data, error, "check");
    if (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Something went wrong";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setLoader(false);
    } else {
      setSnackbarSeverity("success");
      setSnackbarMessage(data?.message || "Field Added Successfully");
    }
    setSnackbarOpen(true);
    userList(token);
  };
  // Function to handle user deletion
  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token");
    // Assuming you have a deleteUser function to handle the deletion

    const { error, data } = await deleteUser(token, id);
    if (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Something went wrong";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
    } else {
      setSnackbarSeverity("success");
      setSnackbarMessage(data?.message || "Field Added Successfully");
    }
    setSnackbarOpen(true);
    userList(token); // Refresh the user list after deletion
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getColumns = async () => {
      setLoader(true);
      const { data, error } = await userColumns(token);
      const fields = data?.fields || {};
      if (!error) {
        console.log(fields);
        setInputFields(fields);
        setColumns(generateColumnsFromSchema(fields, setIsAssignOpen));
      }
      setLoader(false);
    };

    getColumns();
    userList(token);
  }, []);

  const filteredRows = useMemo(() => {
    return tableData
      .map((row) => {
        const updatedRow = {
          ...row,
          assignedAdmin: row.assignedAdmin?.username || "NA",
        };

        return updatedRow;
      })
      .filter((row) =>
        columns.some((column) =>
          row[column.field]
            ?.toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        )
      );
  }, [tableData, columns, searchInput]);

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => (
      <Tooltip title="Delete User">
        <IconButton onClick={() => handleDeleteUser(params.row?._id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    ),
  };
  const allColumns = useMemo(() => [...columns, actionColumn], [columns]);
  useEffect(() => {
    console.log(allColumns, filteredRows, "dataGrid");
  }, [allColumns, filteredRows]);
  return (
    <>
      {loader && <Loader />}
      {/* Snackbar component */}
      <SnackbarAlert
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <Box>
        <Box
          sx={{
            padding: "8px 16px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 3,
            m: 1,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: { xs: "column", sm: "row-reverse" },
            gap: 1,
          }}
        >
          <Button
            onClick={handleOpen}
            variant="text"
            size="small"
            component={Link}
            sx={{
              p: 1,
              bgcolor: "rgb(53, 212, 114)",
              color: "white",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add Contact
          </Button>
          <Button
            onClick={handleSchemaAddOpen}
            variant="text"
            size="small"
            component={Link}
            sx={{
              p: 1,
              bgcolor: "rgb(53, 212, 114)",
              color: "white",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add Schema
          </Button>
        </Box>

        <Box
          sx={{
            padding: "8px 16px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 3,
            margin: "0 auto",
            m: 1,
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{ m: 1 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" align="left" gutterBottom>
              Contact Management
            </Typography>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              sx={{ width: 200 }}
            />
          </Stack>

          <Box sx={{}}>
            <DataGrid
              slots={{ toolbar: CustomToolbar }}
              rows={filteredRows}
              columns={allColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              checkboxSelection={false}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Box>

      <AddModal
        open={open}
        handleClose={handleClose}
        handleAddContact={handleAddContact}
        fields={inputFields}
      />
      <AddSchema
        isSchemaModel={isSchemaModel}
        handlSchemaAddClose={handlSchemaAddClose}
        setIsSchemaModel={setIsSchemaModel}
        userList={userList}
      />
      <AssignModal
        isAssignOpen={isAssignOpen}
        handleAssignClose={handleAssignClose}
      />
    </>
  );
};

export default PhoneBook;
const CustomToolbar = (props) => (
  <div style={{ color: "rgb(53, 212, 114)", padding: "10px" }}>
    <GridToolbar {...props} />
  </div>
);
