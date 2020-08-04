import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import image from "../../../../../assets/ICONO con circulo_Mesa de trabajo 1.png"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useHistory, Prompt} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import Loader from '../../../../../components/Loader'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
    	height: 700,
	  },
	  icon: {
	    color: 'rgba(255, 255, 255, 0.54)',
	  },
	  disableLink: {
	    pointerEvents: "none"
	  },
	  texto: {
	    margin: theme.spacing(1),
	  },
	  boton: {
	    margin: theme.spacing(1),
	  },
	  cardStyle:{              
		padding: "50px 0",    

	  },
	  cardContent:{    
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow : "ellipsis",        
	  }, 
	}));

function AreasRegistradas(props){
	
	
	const { getAccessTokenSilently } = useAuth0();
	const {propertyId, areasTerminadas, nextStep, handleName, handleType, handlePropertyAreaId, handleComplete} = props
	const [loading, setLoading] = useState(true)
	const [openTerminar, setOpenTerminar] = useState(false)
	const [data, setData] = useState()
	let history = useHistory()
	
	
	const [isComplete, setIsComplete] = useState(false)


	useEffect(() => {
		getAreas()			
	},[]);

	
	const getAreas = async () => {
	try {
	  const token = await getAccessTokenSilently();	  	  
	  const response = await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/propertyareas/${propertyId}`, {
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
	const handleClickTerminar = () => {
	    setOpenTerminar(true);
	    setIsComplete(true)
	  };

	// const handleCloseTerminar = () => {
	// 	setOpenTerminar(false);
	// };
	const handleAccept = () => {		
		history.push('/Anfitrion')
	}

	const handleClickToItems =(name, type, propertyAreaId) => {		
		handleName(name)
		handleType(type)
		handlePropertyAreaId(propertyAreaId)
		nextStep()
	}
	const chooseColor = (type) => {		
	    let AreaColor
	    switch (type){
	      case "bano":        
	        return "#2196f3"
	        break;
	      case "cocina":  
	      return "#ff9800"      
	        break;
	      case "dormitorio":
	        return "#00bcd4"
	        break;
	      case "comunes":
	        return "#3f51b5"
	        break;
	      case "aireLibre":
	        return "#ffc107"
	        break;
	      case "entrada":      
	        return "#4caf50"
	        break;
	      case "otros":      
	        return "#9c27b0"
	        break;
	      default:   
	      return  "green" 
	    }   
	    

	  }
	
	const classes = useStyles();
	if(loading){
		return <Loader />
	}else{
		return(	
			<div>		
				<Prompt when={!isComplete} message={"Los cambios no seran guardados"}/>			
				<Typography variant="h3" className={classes.texto}gutterBottom>
			       Areas Registradas
			     </Typography>		
				
				<div>
					<div className={classes.root}>
					    <GridList cellHeight={180} className={classes.gridList}>
					      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
					        
					      </GridListTile>
					      {data && data.map((tile) => (
					        <GridListTile key={tile.orderIndex} onClick={() => !areasTerminadas.includes(tile.name) && handleClickToItems(tile.name, tile.type, tile.propertyAreaId)}>  
								<Card className={classes.cardStyle} style={{background: chooseColor(tile.type)}}>
								  <CardContent >        
								    <Typography className={classes.cardContent} variant="h4" component="h2">
								      {tile.name}
								    </Typography>                
								  </CardContent>   
								  <CardActions>
								  	{areasTerminadas.includes(tile.name) ? <DoneIcon /> : <CheckBoxOutlineBlankIcon/>}
								  </CardActions>   
								</Card>
					        </GridListTile>
					      ))
					    }
					    </GridList>
					</div>
					<div>
						<Button 
							disabled={areasTerminadas.length === data.length ? false : true }
							variant="outlined" color="primary" 
							onClick={handleClickTerminar}
							className={classes.boton}
							 >Terminar Registro</Button>
							
						
						
						
						<Dialog
						    open={openTerminar}
						    
						    aria-labelledby="alert-dialog-title"
						    aria-describedby="alert-dialog-description"
						  >
						    <DialogTitle id="alert-dialog-title">{"Gracias por contribuir"}</DialogTitle>
						    
						    <DialogActions>						      
						      <Button onClick={handleAccept} color="primary" autoFocus>
						        Aceptar
						      </Button>
						    </DialogActions>
						  </Dialog>

					</div>
					</div>
							
				


			</div>
		)

	}

	
}

export default withRouter(AreasRegistradas)