import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';

import TablePerPage from './TablePerPage'



const useStyles = makeStyles((theme) => ({  
  root: {
    margin: theme.spacing(1),
  },
}));

function Detalle({match}){
	const {servicio, hostId} = match.params
	const classes = useStyles();
	const { getAccessTokenSilently } = useAuth0();
	const [folios, setFolios] = useState([])
	let data;
	useEffect(() => {
	  (async () => {
	    try {
	      const token = await getAccessTokenSilently();	      	      
	      const response = await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/desinfectiontickets/retrieve/${hostId}`, {
				headers: {
				Authorization: `Bearer ${token}`
				}
			});

			const responseData = await response.json();
			
			setFolios(responseData.items)
			} catch (error) {
			console.error(error);
			}
	  })();
	}, []);
	if(servicio === "Sin Usar"){
		data = folios.filter(item => item.used === false)	
	}else{
		data = folios.filter(item => item.used === true)	
	}
	
	const columns = [
		{ title: 'Servicio', field: 'tipoServicio' },
      	{ title: 'Folio', field: 'ticketId' },
      	{ title: 'Fecha de creación', field: 'createdAt', type: 'numeric' }
      
    ]
	
	return(
		<div className={classes.root}>

			<TablePerPage data={data} columns={columns} title={"Folios Registrados"}/>			
		</div>
	)
}

export default Detalle