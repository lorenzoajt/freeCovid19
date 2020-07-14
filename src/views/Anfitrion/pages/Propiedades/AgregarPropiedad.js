import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import FormData from 'form-data'
import axios from 'axios'
import Input from '@material-ui/core/Input';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import image from '../../../../assets/noImage.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },  
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
  image: {
    maxWidth:"100%", 
    height:"auto",
  },
  button: {
    margin: theme.spacing(1),
  },
}));



function AgregarPropiedad() {
  let history = useHistory();
  const classes = useStyles();

  const { getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(image)
  

  const [propName, setPropName] = useState("")
  const [adress, setAdress] = useState("")
  
  const fileSelectedHandler = event =>{
    setPreview(URL.createObjectURL(event.target.files[0]))
    setFile(event.target.files[0])  
    
    
  }
  

  const handleAgregar = async () => {
    try {
      const token = await getAccessTokenSilently();
      const post = {
          "propertyName": propName,
          "address": adress
      }

      const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/properties", {
        method: 'POST',
        body: JSON.stringify(post),
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      const responseData = await response.json();      
      let propertyId = responseData.newItem.propertyId
      if(file){
        subirFoto(propertyId)      
      }
      
      
      history.push(`/AgregarArea/${propertyId}`);   
      

    } catch (error) {
      console.error(error);
    }
  };


  const subirFoto = async (propId) =>{
    try{
      const token = await getAccessTokenSilently()    
      const url = `https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/properties/${propId}/images`
      console.log("url a la que se manda a subir la foto: ", url)
      const response = await fetch(url, {
            method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`
              }
          });
      const responseData = await response.json()
      console.log("respuesta para subur foto: ", responseData)
      
      putFoto(responseData.uploadUrl, propId)  
      
      

    }catch(error){
      console.log(error)
    }
    
  }

  const putFoto = (url, propId) => {
    
    var options = {
      headers: {
        'Content-Type': file.type
      }
    };
        
    axios.put(url, file, options).then(res=>console.log("Respuesta del put: ", res)).then(getFoto(propId))
    
      
  }

  const getFoto = async (propId) =>{
    try{
      const token = await getAccessTokenSilently()    
      const url = `https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/properties/${propId}/images`
      console.log("url a la que se manda a subir la foto: ", url)
      const response = await fetch(url, {
            method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`
              }
          });
      const responseData = await response.json()
      console.log("respuesta del get de la foto: ", responseData)
    }catch(error){
      console.log(error)
    }
    
  }


  const check = () => {
    if(propName !== "" && adress !== ""){
      return false
    }else{
      return true
    }    
  }
  

  
  return(
    <div>
      <h1 className={classes.root}>AgregarPropiedad</h1>

      <form noValidate autoComplete="off" className={classes.root}>
      	<TextField   
          error={propName === ""}          
      		id="standard-basic" 
      		label="Nombre"    		
      		onChange={e => setPropName(e.target.value)}
      		defaultValue={propName} 
          helperText="Este campo es obligatorio"     		
      	/>
      	<br/>
      	<TextField
          error={adress === ""}          
      		id="standard-basic" 
      		label="Direccion"       		
      		onChange={e => setAdress(e.target.value)}
      		defaultValue={adress}
          helperText="Este campo es obligatorio"      		
      	/>
              
      </form>
      
     <br/>
     <br/>

     <Button
       component="label"
       color='primary'
       variant="outlined"
       className={classes.button}
     >
       Añadir foto
       <input
         type="file"
         onChange={fileSelectedHandler}
         style={{ display: "none" }}
         accept="image/*"
       />
     </Button>

     <Button 
        disabled={check() && true } 
        onClick={() => handleAgregar()} 
        color='primary'   
        variant="contained"   
        className={classes.button}
     >Siguiente
     </Button>
     
     
     <br/>
     <br/>
     
     <Card className={classes.card}>
     <CardMedia
          component="img"
          alt="usrImg"
          height="140"
          image={preview}
          title="preview"
          className={classes.image}
        />
      </Card>

     
      
     
      
    </div>
  )
}

export default AgregarPropiedad
