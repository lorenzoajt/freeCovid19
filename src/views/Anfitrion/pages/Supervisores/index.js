import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SupervisoresRegistrados from './SupervisoresRegistrados'
import TablePerPage from './TablePerPage'
import Loader from '../../../../components/Loader.js'
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));
function Supervisores(){
	const [supervisores, setSupervisores] = useState({});
	const [newSupervisor, setNewSupervisor] = useState();
	const { getAccessTokenSilently } = useAuth0();
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const classes = useStyles();

	
	useEffect(() => {
	getSupervisores()
	},[newSupervisor]);

	const getSupervisores = async () => {
	  try {
	    const token = await getAccessTokenSilently();	    
	    const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/inspectors", {
	      headers: {
	        Authorization: `Bearer ${token}`
	      }
	    });

	    const responseData = await response.json();

	    setSupervisores(responseData);	   
	    setLoading(false) 	    
	  } catch (error) {
	    console.error(error);
	  }
	};

	const agregarSup = async () => {
		try {
		const token = await getAccessTokenSilently();
		const post = {
		    "name": name,
		    "email": email   
		}

		const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/inspectors", {
			method: 'POST',
			body: JSON.stringify(post),
		  	headers: {
		    	Authorization: `Bearer ${token}`
		  	}
		});
		const responseData = await response.json();
		console.log(responseData)		
		setNewSupervisor(responseData);
		} catch (error) {
		console.error(error);
		}

	}
	const check = () => {
	    if(name !== "" && email.includes("@")){
	      return false
	    }else{
	      return true
	    }    
	  }

	const columns = [
	    
	    { title: 'Nombre', field: 'name' },
	    { title: 'E-mail', field: 'email' },
	    { title: 'Fecha de creación', field: 'created_at', type: 'numeric'},	    
	  ]

	if(loading){
	  return <Loader />
	}else{
	  return (      
	    <div style={{margin:"0 auto"}}>
	    	<form className={classes.root} autoComplete="off" >
	    		<FormLabel component="legend" >Agregar Supervisor</FormLabel>
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
	    	<br/>   	    
	    	<br/>   	    
	    	<Button onClick={agregarSup} variant="contained" color="primary" disabled={check() && true } >Agregar Supervisor</Button>
	      	<TablePerPage data={supervisores} title={"Supervisores Registrados"} columns={columns}/>

	      
	    </div>
	  );

	}


	
}

export default Supervisores