import React, { useState } from "react";
import { Box, Button, Typography, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import RouterPaths from "../../route.paths";

const Home = () => {
  const [loader, setLoader] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isSchemaModel, setIsSchemaModel] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([
    {
      id: 1,
      templateName: "city",
      category: "MARKETING",
      language: "en_US",
      status: "APPROVED",
      action: "Action",
    },
  ]); // Define rows based on your data
  const [allColumns, setAllColumns] = useState([
    { field: "templateName", headerName: "TEMPLATE NAME", width: 250 },
    { field: "category", headerName: "CATEGORY", width: 250 },
    { field: "language", headerName: "LANGUAGE", width: 250 },
    { field: "status", headerName: "STATUS", width: 250 },
    { field: "action", headerName: "ACTION", width: 250 },
  ]);

  const navgate = useNavigate();

  return (
    <Box sx={{ padding: "16px" }}>
      {/* Header with Title and Buttons */}
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
        <Stack direction="row" spacing={1}>
          <Button
            variant="text"
            size="small"
            sx={{
              p: 1,
              bgcolor: "rgb(53, 212, 114)",
              color: "white",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={() => navgate(RouterPaths.TEMPLATES_CREATE)}
          >
            CREATE TEMPLATE
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "rgb(240, 240, 240)",
              color: "black",
              "&:hover": { bgcolor: "rgb(220, 220, 220)" },
            }}
          >
            SYNC TEMPLATES
          </Button>
        </Stack>
      </Box>

      {/* DataGrid Styling */}
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
            Template Management
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
        <Box>
          <DataGrid
            rows={filteredRows}
            columns={allColumns}
            pageSize={5}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
