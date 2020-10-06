import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


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
import ColumnStatic from './ColumnStatic'
import { DragDropContext } from "react-beautiful-dnd";
import columnData from './columnData'
import {defaultAreas} from './defaultAreas'

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
	// TODO:Cambio de estilo en Página de lista reordenable. Mismo estilo que index.js
	//TODO: Comenzar con rectángulos grises e ir iluminando conforme se va llenando la info.
	//
		const [state, setState] = useState(columnData)
		
	//
	
	const { getAccessTokenSilently } = useAuth0();
	const {propertyId, areasTerminadas, nextStep, handleName, handleType, handlePropertyAreaId, numAreas} = props
	const [loading, setLoading] = useState(true)
	const [openTerminar, setOpenTerminar] = useState(false)
	const [data, setData] = useState()
	let history = useHistory()		
	const [isComplete, setIsComplete] = useState(false)
	const defAreas = defaultAreas.items
  	const [areas, setAreas] = useState(defAreas);


	useEffect(() => {
		getAreas()			
	},[]);

	
	const getAreas = async () => {	
	console.log("gettttt", numAreas)	
		try {
		  const token = await getAccessTokenSilently();	  	  
		  const response = await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/propertyareas/${propertyId}`, {
		    headers: {
		      Authorization: `Bearer ${token}`
		    }
		  });
		  const responseData = await response.json();
		  if(responseData.items.length !== numAreas){
		  	getAreas()
		  }	  
		  setData(responseData.items)	  
		  console.log("data",responseData.items)
		  setLoading(false)
		} catch (error) {
		  console.error(error);
		}
	};
	const handleClickTerminar = () => {
	    setOpenTerminar(true);
	    setIsComplete(true)
	  };
	const handleAccept = () => {		
		history.push('/Anfitrion')
	}

	const handleClickToItems =(name, type, propertyAreaId) => {		
		console.log("handlong")
		handleName(name)
		handleType(type)
		handlePropertyAreaId(propertyAreaId)
		nextStep()
	}
	const chooseColor = (type) => {				
	    let AreaColor
	    switch (type){
	      case "bano":        
	        AreaColor = "#2196f3"
	        break;
	      case "cocina":  
	      	AreaColor = "#ff9800"      
	        break;
	      case "dormitorio":
	        AreaColor = "#00bcd4"
	        break;
	      case "comunes":
	        AreaColor = "#3f51b5"
	        break;
	      case "aireLibre":
	        AreaColor = "#ffc107"
	        break;
	      case "entrada":      
	        AreaColor = "#4caf50"
	        break;
	      case "otros":      
	        AreaColor = "#9c27b0"
	        break;
	      default:   
	      AreaColor =  "green" 
	    }   
	    
	    return AreaColor
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
				{/*Areas Registradas*/}
				<div>
					{state.columnOrder.map(columnId =>{
						const column = state.columns[columnId];
						return <ColumnStatic key={columnId} column={column} areas={data} handleClickToItems={handleClickToItems} areasTerminadas={areasTerminadas}/>;
					})}
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