import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    background: {
      default: 'rgb(241, 241, 241)',
    },
    text: {
      primary: '#000000',
    },
    card: {
      background: '#ffffff',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',  // Dark background for dark mode
    },
    text: {
      primary: '#ffffff',
    },
    card: {
      background: '#121212',
    },
  },
});
