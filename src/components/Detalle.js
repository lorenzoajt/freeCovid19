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
	const { getAccessTokenSilently } = useAuth0();
	const classes = useStyles();
	
	const [folios, setFolios] = useState([])
	
	useEffect(() => {

	    const fetchData = async () => {
			try {
				const token = await getAccessTokenSilently();	      	      
				const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/desinfectiontickets/retrieve/${hostId}`, {
					headers: {
					Authorization: `Bearer ${token}`
					}
			});
			const responseData = await response.json();			
			setFolios(responseData.items)
			} catch (error) {
			console.error(error);
			}
		};	 	
	    fetchData();
	  }, []);


	const data = folios.filter(item => item.tipoServicio === `${servicio}`)
	const columns = [
      { title: 'Folio', field: 'ticketId' },
      { title: 'Fecha de creación', field: 'createdAt', type: 'numeric' }
      
    ]
	
	return(
		<div className={classes.root}>
			<TablePerPage data={data} columns={columns} title={`Folios Registrados ${servicio}`}/>			
		</div>
	)
}

export default Detalle