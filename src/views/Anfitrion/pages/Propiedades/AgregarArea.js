import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AreasRegistradas from './AreasRegistradas'

function AgregarArea({match}){
	const { getAccessTokenSilently } = useAuth0();	
	const {propertyId} = match.params
	const [areaName, setAreaName] = useState()

	const createArea = async () => {
		try {
		const token = await getAccessTokenSilently();
		const post = {
		    "name": areaName,	
		    "orderIndex": "2"      
		}

		const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/propertyareas/${propertyId}`, {
			method: 'POST',
			body: JSON.stringify(post),
		  	headers: {
		    	Authorization: `Bearer ${token}`
		  	}
		});
		const responseData = await response.json();
		console.log(responseData)
		


		} catch (error) {
		console.error(error);
		}
	};

	
		return(		
			<div>		

				<h1>AgregarArea</h1>				
				
			    <form noValidate autoComplete="off">
			      <TextField 
			      	id="standard-basic" 
			      	label="Nombre" 
			      	onChange={e => setAreaName(e.target.value)}
			      	defaultValue={areaName}
			      	/>	
			      <br/>			
			      
			    </form>
			    
			    <br/>
			    <br/>
			    <Button 
			    		variant="contained"
			    		onClick={createArea}
			    		component={Link} to={`/AreasRegistradas/${propertyId}`}
			    		>Agregar</Button>

				<Button >Atras</Button>
			    <Button >Siguiente</Button>
			    
			</div>		
		)
	

	
}
export default AgregarArea


