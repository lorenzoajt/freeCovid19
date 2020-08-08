import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CardNoactions from './CardNoActions'


const opcionesFolios = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '100',
    label: '100',
  },
  {
    value: '500',
    label: '500',
  },
  {
    value: '1000',
    label: '1,000',
  },
  
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function NuevoFolio({match}) {  
  const classes = useStyles();
  const [numFoliosDengue, setNumFoliosDengue] = React.useState(0);
  const [numFoliosDesinfeccion, setNumFoliosDesinfeccion] = React.useState(0);
  const [numFoliosLimpieza, setNumFoliosLimpieza] = React.useState(0);
  const { getAccessTokenSilently } = useAuth0();
  const {hostId, hostName} = match.params
  let history = useHistory()

  const agregarFolios = async () => {

    try {
      const token = await getAccessTokenSilently();
      history.push('/Admin/folios')
      //Crear Folios de dengue
      if(numFoliosDengue > 0){
        console.log("numFoliosDengue",numFoliosDengue)
        let url = `https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/desinfectiontickets/create/${numFoliosDengue}` //agregar el num de tickets
        const post = {
            "createdFor": hostId,
            "tipoServicio": "Dengue" 
        }        
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {          
            "Authorization": "Bearer "+ token
          }
        }
        );
        console.log(response.status)
        
      }
      //Crear Folios de desinfeccion
      if(numFoliosDesinfeccion > 0){
        console.log("numFoliosDesinfeccion",numFoliosDesinfeccion)
        let url = `https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/desinfectiontickets/create/${numFoliosDesinfeccion}` //agregar el num de tickets
        const post = {
            createdFor: hostId, 
            "tipoServicio": "Desinfeccion" 
        }
        
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {          
            "Authorization": "Bearer "+ token
          }
        });
        console.log(response.status)
        
      }
      //Crear Folios de Limpieza
      if(numFoliosLimpieza > 0){
        console.log("numFoliosLimpieza",numFoliosLimpieza)
        let url = `https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/desinfectiontickets/create/${numFoliosLimpieza}` //agregar el num de tickets
        const post = {
            createdFor: hostId, 
            "tipoServicio": "Limpieza" 
        }
        
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {          
            "Authorization": "Bearer "+ token
          }
        });
        console.log(response.status)
        
      }
      
    } catch (error) {
      console.error(error);
    }
  };





  const handleChange = servicio => (event) => {
    
    switch (servicio){
      case 'Dengue':
          setNumFoliosDengue(event.target.value)
          break
      case 'Desinfeccion':
          setNumFoliosDesinfeccion(event.target.value)
          break
      case 'Limpieza':
          setNumFoliosLimpieza(event.target.value)
          break
      default:
          setNumFoliosDengue(0)
          setNumFoliosDesinfeccion(0)
          setNumFoliosLimpieza(0)

    }
    
  };
  const check = () => {
    if(numFoliosDengue || numFoliosLimpieza || numFoliosDesinfeccion > 0){
      return false
    }else{
      return true
    }    
  }

  return (
    <div>
      <h1 style={{margin: "0 15px"}}>Se crearán para {hostName} </h1>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            select
            label="Número de folios"
            value={numFoliosDengue}
            onChange={handleChange('Dengue')}
            helperText="Dengue"
          >
            {opcionesFolios.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Número de folios"
            value={numFoliosDesinfeccion}
            onChange={handleChange('Desinfeccion')}
            helperText="Desinfeccion"
          >
            {opcionesFolios.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField          
            select
            label="Número de folios"
            value={numFoliosLimpieza}
            onChange={handleChange('Limpieza')}
            helperText="Limpieza"
          >
            {opcionesFolios.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
       
          
        </div>
      </form>

      
      <CardNoactions servicio={"Dengue"} numFolios={numFoliosDengue}/>      
      <CardNoactions servicio={"Desinfeccion"} numFolios={numFoliosDesinfeccion}/>
      <CardNoactions servicio={"Limpieza"} numFolios={numFoliosLimpieza}/>      
      <Button 
        variant="contained" 
        color="primary"        
        onClick={agregarFolios}
        disabled={check() && true }
        >Agregar Folios
      </Button>
    </div>
  );
}
