import React, { useCallback, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessages } from "../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(loading, error, success);
  }, [loading, error, success]);

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        navigate("/dashboard");
        dispatch(clearMessages()); // Clear messages only after navigation
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, navigate, success]);

  const onSubmit = useCallback(
    async (data) => {
      dispatch(loginUser(data));
    },
    [dispatch]
  );

  const getAlertMessage = () => {
    console.log(success)
    if (error) {
      return error.message || "An error occurred. Please try again.";
    } else if (success) {
      return success;
    }
    return "";
  };

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "fit-content",
        display: "flex",
        bgcolor: "card.background",
        borderRadius: "0.625rem",
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          bgcolor: "transparent",
          boxShadow: "0 0.125rem 0.625rem 0 rgba(20, 21, 33, 0.18)",
          p: 2,
          borderRadius: "0.625rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontSize: "1.375rem", mb: 1, color: "text.primary" }}
          >
            Login
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontSize: "1.375rem", mb: 1, color: "text.primary" }}
          >
            Welcome to Pixe Technologies! 👋
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            Please sign-in to your account and start the adventure
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Username"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
              margin="normal"
              sx={{ height: "calc(2.940725 + 2px)", borderRadius: 3 }}
            />
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              margin="normal"
              sx={{ height: "calc(2.940725 + 2px)", borderRadius: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                mb: 3,
                height: "calc(2.940725 + 2px)",
                borderRadius: 2,
              }}
              aria-label="Login"
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={!!error || (!!success && isAuthenticated)}
        autoHideDuration={4000}
        onClose={() => dispatch(clearMessages())}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => dispatch(clearMessages())}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {getAlertMessage()}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
