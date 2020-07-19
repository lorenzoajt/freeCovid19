import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';





import Tile from '../pages/Propiedades/Tile'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Loader from './../../../components/Loader'


function PropiedadesRegistradas(){
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    let mounted = true
    if (mounted){
      mostrarPropiedades()
    }
    return () => mounted = false;
    }, [data]);
  

  const mostrarPropiedades = async () => {
    try {
      const token = await getAccessTokenSilently();  
      const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/properties", {
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
  




  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    button: {
    margin: theme.spacing(1)
  },
  }));
  const classes = useStyles();
 
  if(loading){
    return <Loader />
  }else{
    return(
      <div>
        <div className={classes.root}>
                
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                
              </GridListTile>
              
              {data && data.map((tile) => (            
                  <div key={tile.propertyId}> 
                    <Tile tile={tile} />
                  </div>
                ))
              }
            </GridList>    
            
        </div>
        <Button className={classes.button} variant="contained" component={Link} to={'/AgregarPropiedad'}>Agregar Propiedad</Button>
      </div>
    )

  }
  
  
}

export default PropiedadesRegistradas