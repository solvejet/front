import React, { useCallback, useEffect } from 'react';
import { TextField, Button, Typography, CircularProgress, Card, CardContent, Box, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearMessages } from '../../redux/slices/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let timeoutId;
    if (success) {
      timeoutId = setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
      dispatch(clearMessages());
    };
  }, [dispatch, navigate, success]);

  const onSubmit = useCallback(async (data) => {
    dispatch(loginUser(data));
  }, [dispatch]);

  const getAlertMessage = () => {
    if (error) {
      return error.message || 'An error occurred. Please try again.';
    } else if (success) {
      return success;
    }
    return '';
  };

  return (
    <Box sx={{ height: 'fit-content', width: 'fit-content', display: 'flex', bgcolor: 'card.background' }}>
      <Card sx={{ maxWidth: 450, width: '100%', bgcolor: 'transparent', boxShadow: 3, p: 2, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontSize: '1.375rem', mb: 1, color: 'text.primary' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Username"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
              margin="normal"
              sx={{ height: 'calc(2.940725 + 2px)', borderRadius: 3 }}
              inputProps={{ 'aria-label': 'Username' }}
            />
            <TextField
              label="Password"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              margin="normal"
              sx={{ height: 'calc(2.940725 + 2px)', borderRadius: 3 }}
              inputProps={{ 'aria-label': 'Password' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, mb: 3, height: 'calc(2.940725 + 2px)', borderRadius: 2 }}
              aria-label="Login"
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={4000}
        onClose={() => dispatch(clearMessages())}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => dispatch(clearMessages())} 
          severity={error ? (error.status === 401 ? "error" : "warning") : "success"} 
          sx={{ width: '100%' }}
        >
          {getAlertMessage()}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;