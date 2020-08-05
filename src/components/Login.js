import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import {Theme} from './Theme.js'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({  
	  root: {
	    margin: theme.spacing(2),
	  },
	}));
const LoginButton = () => {
  	const { loginWithRedirect } = useAuth0();
	
	
	const classes = useStyles();
	return (
		<ThemeProvider theme={Theme}>
	  	<Button className={classes.root} variant="contained" color="secondary" onClick={() => loginWithRedirect()}>
			Iniciar Sesión
		</Button>
	</ThemeProvider>
	)
};

export default LoginButton;