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
import { Link, useHistory, Prompt} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import Loader from '../../../../../components/Loader'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
	    width: 500,
	    height: 450,
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
	  }
	}));

function AreasRegistradas(props){
	
	
	const { getAccessTokenSilently } = useAuth0();
	const [areaNum, setAreaNum] = useState()
	const {propertyId, areasTerminadas, nextStep, handleName, handleType, handlePropertyAreaId, handleComplete} = props
	const [loading, setLoading] = useState(true)
	const [openTerminar, setOpenTerminar] = useState(false)
	const [data, setData] = useState()
	let history = useHistory()
	const [areasArray, setAreasArray] = useState([])
	
	const [isComplete, setIsComplete] = useState(false)


	useEffect(() => {
		getAreas()			
	},[]);

	
	const getAreas = async () => {
	try {
	  const token = await getAccessTokenSilently();	  
	  console.log(propertyId)
	  const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/propertyareas/${propertyId}`, {
	    headers: {
	      Authorization: `Bearer ${token}`
	    }
	  });
	  const responseData = await response.json();
	  console.log(responseData)	  	 
	  setData(responseData.items)	  
	  setAreaNum(responseData.items.length)
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
					        <GridListTile key={tile.orderIndex} onClick={() => handleClickToItems(tile.name, tile.type, tile.propertyAreaId)}>  
					                                                     
					        
					        
					        	<img src={image} alt={tile.propertyAreaId} 			        		 
					        		 className={"MuiGridListTile-tile"}
					        		 
					        	/>
					        
					        
					          
					          <GridListTileBar
					            title={tile.name}						            
      							subtitle={<span> {tile.type}</span>}
					            
					            actionIcon={
					              <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
					                {areasTerminadas.includes(tile.name) ? <DoneIcon /> : <CheckBoxOutlineBlankIcon/>}
					              </IconButton>                  
					            }
					          />
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