import React, {  useState, useEffect } from "react";
import TablePerPage from './TablePerPage'

import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './Anfitriones.css'
import Loader from '../../components/Loader'


export default function Anfitriones() {
	let history = useHistory();
	const [data, setData] = useState([]);
	const { getAccessTokenSilently } = useAuth0();
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
	  (async () => {
	    try {
	      const token = await getAccessTokenSilently();
	      const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/hosts", {
	        headers: {
	          Authorization: `Bearer ${token}`
	        }
	      });

	      const responseData = await response.json();

	      setData(responseData);
	      setLoading(false)
	    } catch (error) {
	      console.error(error);
	    }
	  })();
	}, []);

	
    const buttonStyle = { float: 'right',
                          marginRight: '20px',
                          marginTop: '10px',
    }   
    const columns = [
      
      { title: 'Nombre', field: 'name' },
      { title: 'E-mail', field: 'email' },
      { title: 'Id de usuario', field: 'user_id', type: 'numeric'},
      
    ]
    const actions = [
		{
		  icon: 'search',
		  tooltip: 'Ver Folios',
		  onClick: (event, rowData) => history.push(`/foliosRegistrados/${rowData.user_id}/${rowData.name}`)
		}
	]
	
	if(loading){
		return <Loader />
	}else{
	  return (
	  	<div>	  		
	  		
		    <TablePerPage data={data} title={"Anfitriones Registrados"} actions={actions} columns={columns}/>
		    <Button 
	  		  variant="contained" 
	  		  color="primary"
	  		  component={Link} to="/agregarAnfitrion"
	  		  style={buttonStyle}
	  		  >Agregar Anfitrion
	  		</Button>

	    </div>
	  );
	}
  
}
