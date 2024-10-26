import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useState, useEffect, useMemo } from "react";
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
import axios from "axios";
import Swal from "sweetalert2";
import { addUserSchema } from "../../../../api/users/columns/addUserSchema";
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
};
const styles = {
  container: {
    maxWidth: "500px",
    margin: "10px auto",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  formGroup: {
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  removeButton: {
    backgroundColor: "#f44336",
    padding: "10px",
    marginLeft: "10px",
    width: "auto",
  },
  listItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
};
const options = [
  {
    label: "Text",
    type: "string",
  },
  {
    label: "List",
    type: "string",
  },
  {
    label: "Number",
    type: "number",
  },
  // {
  //   label: "Date",
  //   type: "date",
  // },
];
const AddSchema = ({
  isSchemaModel,
  handlSchemaAddClose,
  setIsSchemaModel,
  userList,
}) => {
  const [heading, setHeading] = useState("");
  const [type, setType] = useState("");
  const [listItems, setListItems] = useState([""]);
  const [error, setError] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [showMinLength, setShowMinLength] = useState(false);
  const [showMaxLength, setShowMaxLength] = useState(false);
  const [showDefaultValue, setShowDefaultValue] = useState(false);
  const [supportedOptions, setSupportedoptions] = useState(options);
  const [loader, setLoader] = useState(false);
  // snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const validateForm = () => {
    if (type === "List") {
      if (!heading.trim()) {
        setError("List heading is required");
        return false;
      }
      const emptyItems = listItems.some((item) => !item.trim());
      if (emptyItems) {
        setError("All list items must be filled");
        return false;
      }
    } else {
      if (!heading.trim()) {
        //one change
        setError("Heading is required");
        return false;
      }
    }
    setError("");
    return true;
  };
  const setAllStateNull = () => {
    setIsSchemaModel(false);
    setType("");
    setHeading("");
    setMinLength("");
    setMaxLength("");
    setDefaultValue("");
    setShowMinLength(false);
    setShowMaxLength(false);
    setShowDefaultValue(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);
    let schemaData = {
      fieldName: heading,
      fieldType: type === "Number" ? "number" : "string",
      options: {},
      required: isRequired,
      ...(showMinLength && { minlenght: minLength }),
      ...(showMaxLength && { maxlength: maxLength }),
      ...(showDefaultValue && { default: defaultValue }),
    };
    if (type === "List") {
      schemaData = {
        ...schemaData,
        options: {
          enum: listItems.filter((item) => item.trim() !== ""),
        },
      };
    }
    // console.log(schemaData);

    const token = localStorage.getItem("token");
    const { data, error } = await addUserSchema(token, schemaData);
    setLoader(false);
    console.log(data, error);
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
      setTimeout(() => {
        userList(token);
      }, [2000]);
    }
    // Reset state
    setSnackbarOpen(true);
    setAllStateNull();
    return;
  };
  const addListItem = () => {
    setListItems([...listItems, ""]);
  };

  const removeListItem = (index) => {
    setListItems(listItems.filter((_, i) => i !== index));
  };

  const updateListItem = (index, value) => {
    const newItems = [...listItems];
    newItems[index] = value;
    setListItems(newItems);
  };

  // unMounting
  useEffect(() => {
    return () => {
      setHeading(null);
      setListItems(null);
    };
  }, []);
  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <>
      {loader ? <Loader /> : <></>}
      {/* Snackbar component */}
      <SnackbarAlert
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <Modal
        open={isSchemaModel}
        onClose={handlSchemaAddClose}
        aria-labelledby="add-schema-modal"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            sx={{
              flexDirection: "row-reverse",
              cursor: "pointer",
              padding: "10px",
            }}
            onClick={() => {
              setAllStateNull();
              setIsSchemaModel(false);
            }}
          >
            X
          </Stack>
          <Typography variant="h6" align="center" gutterBottom>
            Add Schema
          </Typography>

          <Stack>
            {supportedOptions.length > 0 ? (
              <Box>
                <div style={styles.container}>
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{
                        ...styles.container,
                        maxHeight: "400px",
                        overflowY: "auto",
                      }}
                    >
                      <label style={styles.label}>Select Type:</label>
                      <select
                        style={styles.select}
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option value="">Select Type</option>
                        {supportedOptions.map((item, idx) => (
                          <option key={idx} value={item.label} name={item.type}>
                            {item?.label}
                          </option>
                        ))}
                      </select>
                      <div style={{}}>
                        {/* isRequired  */}
                        {type && (
                          <>
                            <div style={{}}>
                              <label style={styles.label}>
                                <input
                                  style={{ margin: "10px" }}
                                  type="checkbox"
                                  checked={isRequired}
                                  onChange={(e) =>
                                    setIsRequired(e.target.checked)
                                  }
                                />
                                Is required
                              </label>
                            </div>
                            {type !== "List" && (
                              <div style={{}}>
                                {/* Checkbox for Min Length */}
                                <div>
                                  <label style={styles.label}>
                                    <input
                                      style={{ margin: "10px" }}
                                      type="checkbox"
                                      checked={showMinLength}
                                      onChange={(e) =>
                                        setShowMinLength(e.target.checked)
                                      }
                                    />
                                    Min Length
                                  </label>
                                  {showMinLength && (
                                    <input
                                      type="number"
                                      style={styles.input}
                                      value={minLength}
                                      onChange={(e) =>
                                        setMinLength(e.target.value * 1)
                                      }
                                      placeholder="Enter min length"
                                    />
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Checkbox for Max Length */}
                            {type !== "List" && (
                              <div>
                                <label style={styles.label}>
                                  <input
                                    style={{ margin: "10px" }}
                                    type="checkbox"
                                    checked={showMaxLength}
                                    onChange={(e) =>
                                      setShowMaxLength(e.target.checked)
                                    }
                                  />
                                  Max Length
                                </label>
                                {showMaxLength && (
                                  <input
                                    type="number"
                                    style={styles.input}
                                    value={maxLength}
                                    onChange={(e) =>
                                      setMaxLength(e.target.value * 1)
                                    } //converting to number
                                    placeholder="Enter max length"
                                  />
                                )}
                              </div>
                            )}

                            {/* Checkbox for Default Value */}
                            {type !== "List" && (
                              <div>
                                <label style={styles.label}>
                                  <input
                                    style={{ margin: "10px" }}
                                    type="checkbox"
                                    checked={showDefaultValue}
                                    onChange={(e) =>
                                      setShowDefaultValue(e.target.checked)
                                    }
                                  />
                                  Default Value
                                </label>
                                {showDefaultValue && (
                                  <input
                                    style={styles.input}
                                    value={defaultValue}
                                    onChange={(e) => {
                                      const defaultVal =
                                        type === "Number"
                                          ? e.target.value * 1
                                          : e.target.value;
                                      setDefaultValue(defaultVal);
                                    }}
                                    placeholder="Enter default value"
                                  />
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {type === "List" && (
                        <div style={styles.formGroup}>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>List Heading:</label>
                            <input
                              style={styles.input}
                              type="text"
                              value={heading}
                              onChange={(e) => setHeading(e.target.value)}
                              placeholder="Enter list heading"
                            />
                          </div>
                          <label style={styles.label}>List Items:</label>
                          {listItems &&
                            listItems.length > 0 &&
                            listItems.map((item, index) => (
                              <div key={index} style={styles.listItemContainer}>
                                <input
                                  style={styles.input}
                                  type="text"
                                  value={item}
                                  onChange={(e) =>
                                    updateListItem(index, e.target.value)
                                  }
                                  placeholder={`Item ${index + 1}`}
                                />
                                {listItems.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeListItem(index)}
                                    style={{
                                      ...styles.button,
                                      ...styles.removeButton,
                                    }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            ))}
                          <button
                            type="button"
                            onClick={addListItem}
                            style={{ ...styles.button, ...styles.addButton }}
                          >
                            Add Items
                          </button>
                        </div>
                      )}

                      {(type === "Text" || type === "Number") && (
                        <div style={styles.formGroup}>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Heading:</label>
                            <input
                              style={styles.input}
                              type="text"
                              value={heading}
                              onChange={(e) => setHeading(e.target.value)}
                              placeholder="Enter heading"
                            />
                          </div>
                        </div>
                      )}

                      {error && <div style={styles.error}>{error}</div>}

                      {type &&
                        (type === "Text" ||
                          type === "Number" ||
                          type === "List") && (
                          <button type="submit" style={styles.button}>
                            Submit
                          </button>
                        )}
                    </div>
                  </form>
                </div>
              </Box>
            ) : (
              <>Unable to fetch supported types</>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
export default AddSchema;
