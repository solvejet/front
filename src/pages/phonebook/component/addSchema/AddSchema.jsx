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
// const supportedTypes = {
//   string: {
//     allowedOptions: [
//       "required",
//       "minlength",
//       "maxlength",
//       "enum",
//       "trim",
//       "lowercase",
//       "uppercase",
//     ],
//   },
//   number: {
//     allowedOptions: ["required", "min", "max", "default"],
//   },
//   boolean: {
//     allowedOptions: ["required", "default"],
//   },
//   date: {
//     allowedOptions: ["required", "min", "max", "default"],
//   },
// };
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
const AddSchema = ({ isSchemaModel, handlSchemaAddClose }) => {
  const [fields, setFields] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStringType, setSelectedStringType] = useState("");
  const [heading, setHeading] = useState("");
  const [listItems, setListItems] = useState([""]); // Array of strings
  const [currentField, setCurrentField] = useState({
    name: "",
    type: "",
    options: {},
  });
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
  const addListItem = () => {
    setListItems([...listItems, { heading: "", value: "" }]);
  };
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
  const handleSubmit = () => {
    console.log("Final Schema:", fields);
    // You can handle the final schema submission here
  };
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
        >
          X
        </Stack>
        <Stack>
          {supportedTypes && Object.keys(supportedTypes).length > 0 ? (
            <div>
              <select onChange={handleTypeChange}>
                <option value="">Select Type</option>
                {Object.keys(supportedTypes).map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* If "string" is selected, show the second dropdown */}
              {selectedType === "string" && (
                <div>
                  <select onChange={handleStringTypeChange}>
                    <option value="">Select String Type</option>
                    <option value="list">List</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              )}

              {/* Show inputs based on the selected string type */}
              {selectedStringType === "list" && (
                <div>
                  <h4>Enter Heading and Values:</h4>

                  {/* Single Heading Input */}
                  <input
                    type="text"
                    placeholder="Heading"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                  />

                  {/* Multiple Values */}
                  {listItems.map((item, idx) => (
                    <div key={idx}>
                      <input
                        type="text"
                        placeholder={`Value ${idx + 1}`}
                        value={item}
                        onChange={(e) =>
                          handleListItemChange(idx, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <Button onClick={addListItem}>+ Add Another Value</Button>
                </div>
              )}

              {selectedStringType === "text" && (
                <div>
                  <input type="text" placeholder="Heading" />
                  <input type="text" placeholder="Value" />
                </div>
              )}
            </div>
          ) : (
            <>Unable to fetch supported types</>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};
export default AddSchema;
