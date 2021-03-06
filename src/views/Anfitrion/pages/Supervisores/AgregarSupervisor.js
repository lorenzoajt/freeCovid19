import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Button} from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Loader from '../../../../components/Loader'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  boton: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function AgregarSupervisor() {
  let history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading2, setLoading2 ] = useState(false)

  const { getAccessTokenSilently } = useAuth0();
  
  const postToAPI = async () => {
    setLoading2(true)
    try {
      const token = await getAccessTokenSilently();	
      const post = {
          "email": email,		        
          "name": name		    
      }	        
      await fetch('https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/users/inspectors', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          Authorization: `Bearer ${token}`
        }
      });    
      setLoading2(false)
      history.push('/Anfitrion/supervisores');       

    } catch (error) {
      setLoading2(false)
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

  if(loading2){
    return <Loader />
  }else{
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
                className= {classes.boton}
          >
          Confirmar
        </Button>    
      </div>
    );
  }
  
}
