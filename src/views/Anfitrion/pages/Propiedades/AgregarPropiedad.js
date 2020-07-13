import React, {useState} from 'react'



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



function AgregarPropiedad() {
  let history = useHistory();
  
  const { getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState()
  

  const [propName, setPropName] = useState("")
  const [adress, setAdress] = useState("")
  
  const fileSelectedHandler = event =>{
    setPreview(URL.createObjectURL(event.target.files[0]))
    ////aqui habia una validacion, si false enviar imagen fefault
    console.log("true")
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


  
  

  
  return(
    <div>
      <h1>AgregarPropiedad</h1>

      <form noValidate autoComplete="off">
      	<TextField   
      		id="standard-basic" 
      		label="Nombre"    		
      		onChange={e => setPropName(e.target.value)}
      		defaultValue={propName}
      		
      	/>
      	<br/>
      	<TextField
      		id="standard-basic" 
      		label="Direccion"       		
      		onChange={e => setAdress(e.target.value)}
      		defaultValue={adress}
      		
      	/>
              
      </form>
      
     <br/>
     <br/>

     <Button 
       onClick={() => handleAgregar()}       
     >Siguiente
     </Button>

     <input type="file" onChange={fileSelectedHandler}/>
     <br/>
     <br/>
     <img src={preview} alt="usrImg" />;


     
      
     
      
    </div>
  )
}

export default AgregarPropiedad
