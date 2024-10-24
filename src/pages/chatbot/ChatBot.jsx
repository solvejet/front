import { Box, Typography, Paper, Button } from "@mui/material";
import { chatBots } from "../../constant/navBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import chatBotTitle from "../../assets/images/chatbot_title.svg";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbar,
} from "@mui/x-data-grid";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddNew from "./AddNew";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const PlayButtonIcon = () => (
  <svg
    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1fxg462"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="PlayCircleOutlineIcon"
  >
    <path d="m10 16.5 6-4.5-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
  </svg>
);

const ChatBot = () => {
  const [isSelected, setIsSelected] = useState(0);

  return (
    <>
      <Box sx={{ display: "flex", gap: "10px" }}>
        {/* leftbar */}
        <Box
          sx={{
            padding: 2,
            bgcolor: "background.paper", // Uses theme-based background color
            color: "text.primary",
            borderRadius: "8px",
            boxShadow: 3,
            margin: "0 auto",
            width: "20%",
          }}
        >
          <Box>
            {chatBots.map((button, idx) => {
              return (
                <Button
                  key={button.id}
                  variant="text"
                  size="small"
                  aria-label={button.label}
                  startIcon={button.icons}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    p: 2,
                    mx: 2,
                    color:
                      isSelected === idx ? "rgb(53, 212, 114)" : "text.primary", // Text color
                    textTransform: "none",
                    "&:hover": {},
                  }}
                  onClick={() => {
                    setIsSelected(idx);
                  }}
                >
                  {button.label}
                </Button>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            width: "80%",
          }}
        >
          <Box>
            {isSelected === 0 && <AutoChatBot />}
            {isSelected === 1 && <SaveTemplate />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatBot;

const AutoChatBot = () => {
  const [isAdd, setIsAdd] = useState(false);
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3m-2 10H6V7h12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13m7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5M8 15h8v2H8z"></path>
    </svg>
  );
  const handleAddNew = () => setIsAdd(true);
  return (
    <Box>
      {!isAdd ? (
        <Box
          sx={{
            bgcolor: "background.paper", // Uses theme-based background color
            color: "text.primary",
            borderRadius: "8px",
            boxShadow: 3,
            margin: 1,
            padding: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ mt: 2 }}>
                <img src={chatBotTitle} width="40%" height="40%" />
              </Box>
              <Box sx={{ mt: 2 }}>
                {" "}
                <Typography
                  variant="body1"
                  sx={{
                    margin: 0, // margin: 0px;
                    fontSize: "0.9rem", // font-size: 0.75rem;
                    letterSpacing: "0rem", // letter-spacing: 0rem;
                    fontWeight: 400, // font-weight: 400;
                    lineHeight: "1rem", // line-height: 1rem;
                    fontFamily: "Outfit", // font-family: Outfit;
                    color: "gray", // color: gray;
                  }}
                >
                  Enhance customer engagement and drive sales by automating your
                  responses using pre-made chat flows. With tailored
                  conversation paths, you can efficiently interact with
                  customers, provide instant assistance.
                </Typography>
              </Box>
              <Box sx={{ mt: 2, width: "50%" }}>
                <Button
                  variant="text"
                  size="small"
                  startIcon={icon}
                  component={Link}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    p: 1,
                    mx: 1,
                    color: "text.primary",
                    "&:hover": {},
                    bgcolor: "rgb(53, 212, 114)",
                  }}
                  onClick={handleAddNew}
                >
                  Add New
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ margin: "auto" }}>play button</Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <AddNew setIsAdd={setIsAdd}/>
      )}
      <Box
        sx={{
          bgcolor: "background.paper", // Uses theme-based background color
          color: "text.primary",
          borderRadius: "8px",
          boxShadow: 3,
          margin: 1,
          padding: 2,
        }}
      >
        <DataGridDemo />
      </Box>
    </Box>
  );
};
const SaveTemplate = () => {
  const columns = [
    // {
    //   field: "checkbox",
    //   headerName: "",
    //   width: 50,
    //   renderCell: (params) => (
    //     <input
    //       type="checkbox"
    //       checked={params.row.selected || false}
    //       onChange={() =>
    //         params.api.setRowData((prev) => {
    //           const newData = [...prev];
    //           newData[params.rowIndex].selected =
    //             !newData[params.rowIndex].selected;
    //           return newData;
    //         })
    //       }
    //     />
    //   ),
    // },

    { field: "id", headerName: "ID", width: 250 },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 250,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      // type: "number",
      width: 250,
      editable: true,
    },
  ];

  const initialRows = [
    {
      id: 1,
      title: "title",
      type: "Text",
      createdAt: "2024-02-08 20:47:59",
    },
    {
      id: 2,
      title: "title",
      type: "Video",
      createdAt: "2024-02-08 20:47:59",
    },
  ];
  const [rows, setRows] = useState(initialRows);
  const selectedCount = rows.filter((row) => row.selected).length;

  const handleDelete = () => {
    setRows(rows.filter((row) => !row.selected));
  };
  return (
    <Box>
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
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="left"
          gutterBottom
        >
          Templates {selectedCount > 0 && `(${selectedCount})`}
          <IconButton
            onClick={handleDelete}
            disabled={selectedCount === 0}
            color="secondary"
            sx={{ marginLeft: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
        <DataGrid
          checkboxSelection
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
          // onSelectionModelChange={(newSelection) => {
          //   const updatedRows = rows.map((row) => ({
          //     ...row,
          //     selected: newSelection.includes(row.id),
          //   }));
          //   setRows(updatedRows);
          // }}
        />
      </Box>
    </Box>
  );
};
function DataGridDemo() {
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "flowTitle",
      headerName: "Flow title",
      width: 150,
      editable: true,
    },
    {
      field: "isActive",
      headerName: "Is Active?",
      // type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      // valueGetter: (value, row) => ``,
    },
    {
      field: "delete",
      headerName: "Delete",
      // type: "number",
      width: 150,
      editable: true,
    },
  ];

  const rows = [];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <SmartToyIcon fontSize="medium" sx={{ marginRight: 1 }} />
        <Typography variant="h6">Chatbot list</Typography>
      </Box>
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
        components={{
          Toolbar: () => (
            <Box sx={{ padding: 1 }}>
              <GridToolbarQuickFilter />
            </Box>
          ),
        }}
      />
    </Box>
  );
}
