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
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userColumns } from "../../api/users/columns/getColumns";
import { getUserList } from "../../api/users/getUserList";
import Loader from "../../components/loader/Loader";
import { createUser } from "../../api/users/createUser";
import AddSchema from "./component/addSchema/AddSchema";
import Swal from "sweetalert2";
import AddModal from "./component/addUser/AddUser";
import AssignModal from "./component/assignUser/AssignUser";

const generateColumnsFromSchema = (schema) => {
  return Object.keys(schema).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 200, // Increase width for more space
    renderCell: (params) => {
      const value = params.value;
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSchemaAddOpen = () => setIsSchemaModel(true);
  const handlSchemaAddClose = () => setIsSchemaModel(false);
  const handleAssignOpen = () => setIsAssignOpen(true);
  const handleAssignClose = () => setIsAssignOpen(false);

  const userList = async (token) => {
    setLoader(true);
    const response = await getUserList(token);
    const formattedData = response?.users.map((user, index) => ({
      id: index, // Ensure each row has a unique id
      ...user,
    }));
    setTableData(formattedData || []);
    setLoader(false);
  };
  // Function to handle deletion of all users in a column

  const handleAddContact = async (userData) => {
    const token = localStorage.getItem("token");
    const { data, error } = await createUser(token, userData);
    if (error) {
      const errorMessage =
        error?.response?.data?.error?.message || error?.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "User Added Successfully",
      });
      userList(token);
    }
  };
  // Function to handle user deletion
  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token");
    // Assuming you have a deleteUser function to handle the deletion
    const { error } = await createUser(token, id);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete user.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "User Deleted Successfully",
      });
      userList(token); // Refresh the user list after deletion
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getColumns = async () => {
      setLoader(true);
      const { data, error } = await userColumns(token);
      const fields = data?.fields || {};
      if (!error) {
        setInputFields(fields);
        setColumns(generateColumnsFromSchema(fields));
      }
      setLoader(false);
    };

    getColumns();
    userList(token);
  }, []);

  const filteredRows = useMemo(() => {
    return tableData.filter((row) =>
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
      <IconButton onClick={() => handleDeleteUser(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    ),
  };
  const allColumns = useMemo(() => [...columns, actionColumn], [columns]);

  return (
    <>
      {loader && <Loader />}
      <Box>
        <Box
          sx={{
            padding: 2,
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
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add Schema
          </Button>
        </Box>

        <Box
          sx={{
            padding: 2,
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
              rows={tableData}
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
