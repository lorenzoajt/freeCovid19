import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange } from '@material-ui/core/colors';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#354B63',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#fc1c8c',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
  },
});


