import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Tile from './Tile'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Loader from '../../../../components/Loader'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 800,
      height: "80vh",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    button: {
    margin: theme.spacing(1)
  },
  }));

function PropiedadesRegistradas(){
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const classes = useStyles();
  useEffect(() => {           
      getPropiedades();      
    }, []);
    
    const getPropiedades = async () => {
      
        try {
          const token = await getAccessTokenSilently();  
          const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/properties",{
            method: 'GET',        
              headers: {
                Authorization: `Bearer ${token}`
              }
          });      
          const responseData = await response.json();    
          setData(responseData.items)  
          setLoading(false)
        } catch (error) {
          console.error(error);
        }
      };
  
 if(data){
  if(loading){
    return <Loader />
  }else{
    return(
      <div>
      <Button color= 'primary' className={classes.button} variant="contained" component={Link} to={'/Anfitrion/AgregarPropiedad'}>Agregar Propiedad</Button>
        <div className={classes.root}>
                
            <GridList cellHeight={180} className={classes.gridList} cols={3}>                            
              {data && data.map((tile) => (            
                  <div key={tile.propertyId}> 
                    <Tile tile={tile} getPropiedades={getPropiedades}/>
                  </div>
                ))
              }
            </GridList>    
            
        </div>
        
      </div>
    )

  }

 }else{
  return(<Button color= 'primary' className={classes.button} variant="contained" component={Link} to={'/AgregarPropiedad'}>Agregar Propiedad</Button>)
 }
  
  
  
}

export default PropiedadesRegistradas