import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Loader from './../../../components/Loader'
import image from '../../../assets/ICONO con circulo_Mesa de trabajo 1.png'

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100vh",
    height: "100vh",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  media:{
    height: 140
  },
  cardStyle:{        
    whiteSpace: "nowrap",
    overflow: "hidden",  
    textOverflow: "ellipsis",
  }
  
}));

function Historial(){
  const [loading, setLoading] = useState(true)//cambiar a true
  const {getAccessTokenSilently} = useAuth0()
  const [data, setData] = useState([])
  const classes = useStyles();
  
  useEffect(() => {
    const getServices = async () => {
      try{
        const token = await getAccessTokenSilently()
        const response = await fetch("https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/services/host", {
          method: 'GET', 
            headers: {
              Authorization : `Bearer ${token}`
            }
        })
        const responseData = await response.json()                
        const finished = responseData.filter(item => item.service.finished === false )/////cambiarlo a true        
        setData(finished)
        setLoading(false)
      }catch(error){
        console.log(error)
      }
    };

    getServices()
  }, []);
  
  

 
  if(loading){
    return <Loader />
  }else{
    if(data.length === 0){
      return (
        <Typography variant="h3" className={classes.texto}gutterBottom>
          Aún no tiene servicios terminados
        </Typography> 
      )
    }else{
      return(
        <div className={classes.root}>
         <GridList cellHeight={400} className={classes.gridList}>        
           {data.map((tile) => (
            <GridListTile key={tile.service.serviceId}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={image}
                    title=""
                    />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {tile.property.propertyName === undefined ? "Propiedad eliminada": tile.property.propertyName}                  
                    </Typography>
                    <Typography className={classes.cardStyle} variant="body2" color="textSecondary" component="p">
                      {tile.property.address === undefined ? "Propiedad eliminada": tile.property.address}
                    </Typography><br/>
                    <Typography className={classes.cardStyle} variant="body2" color="textSecondary" component="p">
                      {tile.service.createdAt.substr(0,10)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>        
                  <Button size="small" color="primary">
                  Ver reporte
                  </Button>
                </CardActions>
              </Card>
            </GridListTile>
          ))}
         </GridList>
        </div>
      )
    }
  }
  
  
}

export default Historial