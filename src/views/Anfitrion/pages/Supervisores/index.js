import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TablePerPage from './TablePerPage'
import Loader from '../../../../components/Loader.js'
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({  
  root: {
    margin: theme.spacing(1),
  },
}));
function Supervisores(){
	const [supervisores, setSupervisores] = useState({});
	const { getAccessTokenSilently } = useAuth0();
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const classes = useStyles();

	
	useEffect(() => {
	getSupervisores()
	},[]);

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
	    console.log("error", error);
	  }
	};
	

	const columns = [
	    
	    { title: 'Nombre', field: 'name' },
	    { title: 'E-mail', field: 'email' },
	    { title: 'Fecha de creación', field: 'created_at', type: 'numeric'},	    
	  ]

	if(loading){
	  return <Loader />
	}else{
	  return (      
	    <div className={classes.root}>
	    	<Button 
	  		  variant="contained" 
	  		  color="primary"
	  		  component={Link} to="/agregarSupervisor"	  		  
	  		  >Agregar Supervisor
	  		</Button>  	    
	    	
	      	<TablePerPage data={supervisores} title={"Supervisores Registrados"} columns={columns}/>

	      
	    </div>
	  );

	}


	
}

export default Supervisores