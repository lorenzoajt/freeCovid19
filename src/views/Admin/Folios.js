import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './Anfitriones.css'
import Loader from '../../components/Loader'
import TablePerPage from './TablePerPage'

const useStyles = makeStyles((theme) => ({  
  root: {
    margin: theme.spacing(1),
  },
}));

export default function Folios() {
  let history = useHistory();
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
    

  useEffect(() => {
      const fetchData = async () => {
      try {
          const token = await getAccessTokenSilently();
          const response = await fetch("https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/users/hosts", {
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
      };
   
      fetchData();
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
      onClick: (event, rowData) => history.push(`/Admin/nuevoFolio/${rowData.user_id}/${rowData.name}`)
    }
  ]
  
  if(loading){
    return <Loader />
  }else{
    return (      
      <div className={classes.root}>
        <TablePerPage data={data} title={"Agregar Folio"} actions={actions} columns={columns}/>
      </div>
    );

  }
  
  

  
}
