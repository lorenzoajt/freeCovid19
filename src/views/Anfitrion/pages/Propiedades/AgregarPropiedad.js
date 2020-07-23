import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import image from '../../../../assets/noImage.jpeg'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  texto: {
    margin: theme.spacing(1),
  }
}));



function AgregarPropiedad() {
  let history = useHistory();
  const classes = useStyles();

  const { getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(image)
  const [open, setOpen] = React.useState(false);////open snackbar
  const [errorMsg, setErrorMsg] = React.useState("")

  const [propName, setPropName] = useState("")
  const [adress, setAdress] = useState("")
  const [loading, setLoading] = useState(false)
  
  const fileSelectedHandler = event =>{
    setPreview(URL.createObjectURL(event.target.files[0]))
    setFile(event.target.files[0])  
    
    
  }

  const handleAgregar = async () => {
    setLoading(true)

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
        if(response.status !== 201){
          const responseData = await response.text();                
          setErrorMsg(responseData)
          setLoading(false)
          setOpen(true);

        }else{
          const responseData = await response.json();      
          let propertyId = responseData.newItem.propertyId
          if(file){
            subirFoto(propertyId)      
          }
          
          setLoading(false)
          history.push(`/Anfitrion/AgregarArea/${propertyId}`);   

        }

      } catch (error) {
        console.error("error=>", error);
      }
    };


  const subirFoto = async (propId) =>{
    try{
      const token = await getAccessTokenSilently()    
      const url = `https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/properties/${propId}/images`      
      const response = await fetch(url, {
            method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`
              }
          });
      const responseData = await response.json()            
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
        
    axios.put(url, file, options)
    setLoading(false)
      
  }
 
  const check = () => {
    if(propName !== "" && adress !== ""){
      return false
    }else{
      return true
    }    
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setLoading(false)
    }    
    setOpen(false);


  };
  

  
  return(
    <div>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>      
      <Typography variant="h3"className={classes.texto} gutterBottom>
       Agregar Propiedad
      </Typography>  
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>

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
