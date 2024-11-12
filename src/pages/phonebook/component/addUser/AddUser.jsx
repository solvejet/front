import React, { useEffect, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

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

const AddModal = ({ open, handleClose, handleAddContact, fields }) => {
  console.log(fields)
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const id = decoded?.id;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    handleAddContact({ ...data, assignedAdmin: id });
    handleClose();
    reset();
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

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          sx={{
            maxHeight: "70vh", // Sets a max height for the form
            overflowY: "auto", // Enables vertical scroll when necessary
          }}
        >
          {fields &&
            Object.keys(fields).length > 0 &&
            Object.keys(fields).map((field) => {
              const fieldProps = fields[field];
              const isRequired = fieldProps.required;
              // Check if field is 'assignedAdmin' and skip rendering its input
              if (field === "assignedAdmin") {
                return null; // Do not render input for assignedAdmin
              }
              return (
                <Controller
                  key={field}
                  name={field}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: isRequired ? `${field} is required` : false,
                    minLength: fieldProps.minlength,
                    maxLength: fieldProps.maxlength,
                    pattern: fieldProps.pattern,
                  }}
                  render={({ field: inputProps }) => {
                    if (fieldProps.type === "String" && fieldProps.enum) {
                      return (
                        <FormControl fullWidth margin="normal">
                          <InputLabel id={`${field}-select-label`}>
                            {field} {isRequired && "*"}
                          </InputLabel>
                          <Select
                            labelId={`${field}-select-label`}
                            label={`${field} ${isRequired ? "*" : ""}`}
                            {...inputProps}
                          >
                            {fieldProps.enum.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[field] && (
                            <Typography color="error">
                              {errors[field].message}
                            </Typography>
                          )}
                        </FormControl>
                      );
                    }

                    return (
                      <TextField
                        fullWidth
                        label={`${field} ${isRequired ? "*" : ""}`}
                        margin="normal"
                        variant="outlined"
                        type={fieldProps.type === "Number" ? "number" : "text"}
                        error={!!errors[field]}
                        helperText={errors[field]?.message}
                        {...inputProps}
                      />
                    );
                  }}
                />
              );
            })}

          <Box display="flex" justifyContent="space-between" m={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                p: 1,
                bgcolor: "rgb(53, 212, 114)",
                color: "white",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Submit
            </Button>
            <Button variant="outlined" color="secondary" sx={{border:"1px solid rgb(53, 212, 114)",color:"rgb(53, 212, 114)"}} onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModal;
