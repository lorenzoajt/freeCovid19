import React, {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

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

		const response = await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/propertyareas/${propertyId}`, {
			method: 'POST',
			body: JSON.stringify(post),
		  	headers: {
		    	Authorization: `Bearer ${token}`
		  	}
		});
		const responseData = await response.json();
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


