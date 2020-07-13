import React, { useMemo, useState, useEffect } from "react";
import TableComponent from './TableComponent'

import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './Anfitriones.css'
import Loader from '../../components/Loader'
import TablePerPage from './TablePerPage'


export default function Folios() {
  let history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);
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
  const columns = [
      
      { title: 'Nombre', field: 'name' },
      { title: 'E-mail', field: 'email' },
      { title: 'Id de usuario', field: 'user_id', type: 'numeric'},
      
    ]
  const actions = [
    {
      icon: 'library_add',
      tooltip: 'Agregar Folio',
      onClick: (event, rowData) => history.push(`/nuevoFolio/${rowData.user_id}/${rowData.name}`)
    }
  ]
  
  if(loading){
    return <Loader />
  }else{
    return (      
      <div>
        <TablePerPage data={data} title={"Agregar Folio"} actions={actions} columns={columns}/>
      </div>
    );

  }
  
  

  
}
