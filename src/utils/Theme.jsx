import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#ffffff', // white
      main: '#fafafa',
      dark: '#eeeeee',
      contrastText: '#586069',
    },
    secondary: {
      light: '#363636', // panel black
      main: '#272727',
      dark: '#121212',
      contrastText: '#ffffff',
    },
    success: {
      light: '#81befc', // blue
      main: '#4ca3fc',
      dark: '#1e88e5',
      contrastText: '#ffffff',
    },
  },
});

export default function Theme(props) {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
