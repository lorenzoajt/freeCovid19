import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {InputLabel, Button} from '@material-ui/core/';
import {Input} from '@material-ui/core/';
import Loader from '../../components/Loader'
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function AgregarAnfitrion() {
  let history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  
  const { getAccessTokenSilently } = useAuth0();
  
  const postToAPI = async () => {
    try {
      const token = await getAccessTokenSilently();	
      const post = {
          "email": email,		        
          "name": name		    
      }	  
      const response = await fetch('https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/hosts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      history.push('/anfitriones');       

    } catch (error) {
      console.error(error);
    }
  };

  
  const check = () => {
    if(name !== "" && email.includes("@")){
      return false
    }else{
      return true
    }    
  }

  return (
    <div>

      <form className={classes.root} autoComplete="off" >
          <TextField
            error={name === ""}          
            label="Nombre"
            helperText="Este campo es obligatorio"
            onChange={event=> setName(event.target.value)}
          />
          <TextField
            error={email.includes("@") === false}        
            label="E-mail"
            helperText="Este campo es obligatorio"
            onChange={event=> setEmail(event.target.value)}
          />
          
      </form>
      <Button type="submit" 
              variant="outlined" 
              color="primary"
              value="Agregar" 
              disabled={check() && true}                        
              onClick={postToAPI}
        >
        Confirmar
      </Button>
   

    </div>

  );
}
