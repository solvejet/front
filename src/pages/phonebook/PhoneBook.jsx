/* eslint-disable no-constant-condition */
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
  Stack,
} from "@mui/material";

import { useState, useEffect, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userColumns } from "../../api/users/columns/getColumns";
import { getUserList } from "../../api/users/getUserList";
import { useTable, useGlobalFilter } from "react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Loader from "../../components/loader/Loader";
import { createUser } from "../../api/users/createUser";
import AddSchema from "./component/addSchema/AddSchema";
import Swal from "sweetalert2";
import AddModal from "./component/addUser/AddUser";
import AssignModal from "./component/assignUser/AssignUser";
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const generateColumnsFromSchema = (schema) => {
  return Object.keys(schema).map((key) => ({
    Header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the header
    accessor: key, // Set the accessor to the key
    Cell: ({ cell }) => {
      const value = cell.value;

      // Check if the value is an object (e.g., referralSource)
      if (typeof value === "object" && value !== null) {
        // Display key:value pairs
        return (
          <div>
            {Object.entries(value).map(([k, v]) => (
              <div key={k}>
                <strong>{k}:</strong> {v}
              </div>
            ))}
          </div>
        );
      }

      // If the value is not an object, display it as is or 'null'
      return value !== undefined ? value : "null";
    },
  }));
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const PhoneBook = () => {
  const [open, setOpen] = useState(false);
  const [isSchemaModel, setIsSchemaModel] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSchemaAddOpen = () => setIsSchemaModel(true);
  const handlSchemaAddClose = () => setIsSchemaModel(false);
  const handleAssignOpen = () => setIsAssignOpen(true);
  const handleAssignClose = () => setIsAssignOpen(false);
  const [columns, setColumns] = useState([]); // State for table columns
  const [tableData, setTableData] = useState([]);
  const [inputFields, setInputFields] = useState(); // State for the schema object
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // New state for search input
  const tableColumns = useMemo(() => columns, [columns]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
    },
    useGlobalFilter
  );
  // Add search handler function
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value || "");
    setGlobalFilter(event.target.value || ""); // Set global filter to search input
  };

  const userList = async (token) => {
    const response = await getUserList(token);
    // console.log(response);
    setTableData(response?.users || []);
  };
  const handleAddContact = async (userData) => {
    const token = localStorage.getItem("token");
    const { data, error } = await createUser(token, userData);
    console.log(data, error);
    if (error) {
      const errorMessage =
        error?.response?.data?.error?.message || error?.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else {
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "User Added Successfully",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
      userList(token);
    }
  };
  /*
dummy data
  const data = React.useMemo(
    () => [
      { col1: "Hello", col2: "World" },
      { col1: "React", col2: "Table" },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Column 1", accessor: "col1" }, // accessor is the "key" in the data
      { Header: "Column 2", accessor: "col2" },
    ],
    []
  );

*/

  useEffect(() => {
    console.log(tableData, "tableData");
    console.log(tableColumns, "tableColumns");
    console.log(rows, "rows");
    console.log(headerGroups, "headerGroups");
    console.log(getTableBodyProps, "getTableBodyProps");
  }, [tableData, tableColumns]);

  // get userList and schema
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getColumns = async () => {
      setLoader(true);
      const { data, error } = await userColumns(token);
      const fields = data?.fields || {};
      if (error) {
        // Handle error (e.g., show a message to the user)
        console.error("Failed to fetch columns:", error);
      } else {
        // console.log(schemaData, "schemaData");
        setInputFields(fields);
        setColumns(generateColumnsFromSchema(fields)); // Generate columns based on schema
      }

      setLoader(false);
    };

    getColumns();
    userList(token);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      {loader ? <Loader /> : <></>}
      <Box sx={{}}>
        {/* add contact N add schema Box*/}
        <Box
          sx={{
            padding: 2,
            bgcolor: "background.paper",
            color: "text.primary",
            borderRadius: "8px",
            boxShadow: 3,
            margin: "0 auto",
            m: 1,
            display: "flex",
            flexWrap: "wrap", // Allow wrapping on smaller screens
            flexDirection: { xs: "column", sm: "row-reverse" }, // Stack vertically on extra-small screens
            gap: 1, // Space between buttons when wrapped
          }}
        >
          <Button
            onClick={handleOpen}
            variant="text"
            size="small"
            component={Link}
            sx={{
              p: 1,
              color: "text.primary",
              bgcolor: "rgb(53, 212, 114)",
              width: { xs: "100%", sm: "auto" }, // Full width on extra-small screens
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
              color: "text.primary",
              bgcolor: "rgb(53, 212, 114)",
              width: { xs: "100%", sm: "auto" }, // Full width on extra-small screens
            }}
          >
            Add Schema
          </Button>
        </Box>

        {/* table box */}
        <Box
          sx={{
            padding: 2,
            bgcolor: "background.paper",
            color: "text.primary",
            borderRadius: "8px",
            boxShadow: 3,
            margin: "0 auto",
            m: 1,
            p: 2,
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{ m: 1 }}
            justifyContent="space-between"
            alignItems="center"
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
            <Stack spacing={2} direction="row-reverse" sx={{ m: 1 }}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchInput}
                onChange={handleSearchChange}
                sx={{ width: 200 }}
              />
            </Stack>
          </Stack>

          <TableContainer
            component={Paper}
            sx={{ maxHeight: 340, overflowX: "auto" }}
          >
            <Table {...getTableProps()} stickyHeader sx={{ minWidth: 800 }}>
              <TableHead>
                {headerGroups.map((headerGroup, idx) => (
                  <TableRow key={idx} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                      <StyledTableCell
                        key={idx}
                        {...column.getHeaderProps()}
                        style={{
                          width: 150, // Fixed column width
                          whiteSpace: "nowrap",
                          fontSize: "1rem", // Increase font size
                        }}
                      >
                        {column.render("Header")}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, idx) => {
                      prepareRow(row);
                      return (
                        <StyledTableRow {...row.getRowProps()} key={idx}>
                          {row.cells.map((cell, idx) => (
                            <TableCell
                              key={idx}
                              {...cell.getCellProps()}
                              style={{
                                padding: "10px",
                                borderBottom: "1px solid black",
                              }}
                            >
                              {cell.render("Cell")}
                            </TableCell>
                          ))}
                        </StyledTableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={0} style={{ textAlign: "center" }}>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

              {/* Pagination controls */}
              {tableData.length > 10 && (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={headerGroups[0].headers.length}
                      count={tableData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                      // sx={{border:"1px solid red",alignContent:"center",alignItems:"center"}}
                    />
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {/* models */}
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
