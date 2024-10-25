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
const styles = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  formGroup: {
    marginBottom: "20px",
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
const AddSchema = ({
  isSchemaModel,
  handlSchemaAddClose,
  setIsSchemaModel,
}) => {
  const [fields, setFields] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStringType, setSelectedStringType] = useState("");
  const [heading, setHeading] = useState("");
  // const [listItems, setListItems] = useState([""]); // Array of strings
  const [currentField, setCurrentField] = useState({
    name: "",
    type: "",
    options: {},
  });
  const [type, setType] = useState("");
  const [format, setFormat] = useState("");
  // const [heading, setHeading] = useState('');
  const [value, setValue] = useState("");
  const [listItems, setListItems] = useState([""]);
  const [error, setError] = useState("");
  const [supportedTypes, setSupportedTypes] = useState(null);
  const handleAddField = () => {
    setFields([...fields, { ...currentField }]);
    setCurrentField({
      name: "",
      type: "",
      options: {},
    });
  };

  const handleOptionChange = (option, value) => {
    setCurrentField((prev) => ({
      ...prev,
      options: { ...prev.options, [option]: value },
    }));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedStringType(""); // Reset the string type dropdown if type changes
  };
  const handleStringTypeChange = (e) => {
    setSelectedStringType(e.target.value);
  };
  // const addListItem = () => {
  //   setListItems([...listItems, { heading: "", value: "" }]);
  // };
  const handleEnumOptions = (e) => {
    const options = e.target.value.split(",");
    setCurrentField((prev) => ({
      ...prev,
      options: { ...prev.options, enum: options },
    }));
  };
  const handleListItemChange = (index, field, value) => {
    const updatedListItems = [...listItems];
    updatedListItems[index][field] = value;
    setListItems(updatedListItems);
  };
  const validateForm = () => {
    if (type === "string" && format === "list") {
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
      if (!heading.trim() || !value.trim()) {
        setError("Both heading and value are required");
        return false;
      }
    }
    setError("");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (type === "string" && format === "list") {
      console.log({
        type: type,
        format: format,
        listHeading: heading,
        listItems: listItems,
      });
    } else {
      console.log({
        type: type,
        format: format || "single",
        heading: heading,
        value: value,
      });
    }
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
  // fetch supported type
  useEffect(() => {
    const data = async () => {
      try {
        const getSchema = await axios.get("data/getSchema.json");
        console.log("Fetched Data:", getSchema?.data?.supportedTypes);
        setSupportedTypes(getSchema?.data?.supportedTypes || {}); // Ensure it's not null
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    data();
  }, []);
  // unMounting
  useEffect(()=>{
return ()=>{

}
  },[])
  return (
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
          }}
          onClick={() => {
            setIsSchemaModel(false);
          }}
        >
          X
        </Stack>
        <Typography variant="h6" align="center" gutterBottom>
          Add Schema
        </Typography>

        <Stack>
          {supportedTypes && Object.keys(supportedTypes).length > 0 ? (
            <Box>
              <div style={styles.container}>
                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Select Type:</label>
                    <select
                      style={styles.select}
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setFormat("");
                        setHeading("");
                        setValue("");
                        setListItems([""]);
                        setError("");
                      }}
                    >
                      <option value="">Select Type</option>
                      {Object.keys(supportedTypes).map((item, idx) => (
                        <option key={idx} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    {/* If "string" is selected, show the second dropdown */}
                    {type === "string" && (
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Select Format:</label>
                        <select
                          style={styles.select}
                          value={format}
                          onChange={(e) => {
                            setFormat(e.target.value);
                            setHeading("");
                            setValue("");
                            setListItems([""]);
                            setError("");
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="list">List</option>
                          <option value="text">Text</option>
                        </select>
                      </div>
                    )}

                    {type === "string" && format === "list" && (
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
                        {listItems.map((item, index) => (
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
                          Add Item
                        </button>
                      </div>
                    )}

                    {((type === "string" && format === "text") ||
                      type === "number") && (
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
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Value:</label>
                          <input
                            style={styles.input}
                            type={type === "number" ? "number" : "text"}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                          />
                        </div>
                      </div>
                    )}

                    {error && <div style={styles.error}>{error}</div>}

                    {type &&
                      ((type === "string" && format) || type === "number") && (
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
  );
};
export default AddSchema;
