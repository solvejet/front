import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => (
  <Container maxWidth="sm" sx={{ height: '100vh' }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',      // Center vertically
        height: '100%',            // Full height of the container
      }}
    >
      <LoginForm />
    </Box>
  </Container>
);

export default LoginPage;
