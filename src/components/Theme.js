import { createMuiTheme } from '@material-ui/core/styles';


// TODO:Cambio de color en botones de la página
export const Theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#223D52',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#FAF9FA',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#354B63',
    },
  },
});


