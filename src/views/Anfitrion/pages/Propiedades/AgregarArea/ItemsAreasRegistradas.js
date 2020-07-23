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
import { Link, useHistory } from "react-router-dom";
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

function AreasRegistradas({areasTerminadas, match}){
	
	
	const { getAccessTokenSilently } = useAuth0();
	const [areaNum, setAreaNum] = useState()
	const {propertyId} = match.params
	const [loading, setLoading] = useState(true)
	const [openTerminar, setOpenTerminar] = useState(false)
	const [data, setData] = useState()
	let history = useHistory()
	const [areasArray, setAreasArray] = useState([])


	useEffect(() => {
		getAreas()	
	},[]);


	const getAreas = async () => {
	try {
	  const token = await getAccessTokenSilently();	  
	  const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/propertyareas/${propertyId}`, {
	    headers: {
	      Authorization: `Bearer ${token}`
	    }
	  });
	  const responseData = await response.json();	  
	  setData(responseData.items)	  
	  setAreaNum(responseData.items.length)
	  setLoading(false)
	} catch (error) {
	  console.error(error);
	}
	};
	const handleClickTerminar = () => {
	    setOpenTerminar(true);
	  };

	const handleCloseTerminar = () => {
		setOpenTerminar(false);
	};
	const handleAccept = () => {
		history.push('/Anfitrion')
	}

	
	const classes = useStyles();
	if(loading){
		return <Loader />
	}else{
		return(	
			<div>
				<Typography variant="h3" className={classes.texto}gutterBottom>
			       Areas Registradas
			     </Typography>		
				
				{areaNum > 0 ? <div>
								<div className={classes.root}>
								    <GridList cellHeight={180} className={classes.gridList}>
								      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
								        
								      </GridListTile>
								      {data && data.map((tile) => (
								        <GridListTile key={tile.orderIndex}>  
								                                                     
								        
								        <Link className={areasTerminadas.includes(tile.name)? classes.disableLink : ""} to={`/Anfitrion/AgregarItems/${tile.name}/${tile.type}/${tile.propertyAreaId}/${propertyId}`}>
								        	<img src={image} alt={tile.propertyAreaId} 			        		 
								        		 className={"MuiGridListTile-tile"}
								        	/>
								        </Link>
								        
								          
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
									    onClose={handleCloseTerminar}
									    aria-labelledby="alert-dialog-title"
									    aria-describedby="alert-dialog-description"
									  >
									    <DialogTitle id="alert-dialog-title">{"Está seguro que desea terminar el registro?"}</DialogTitle>
									    <DialogContent>
									      <DialogContentText id="alert-dialog-description">
									        Una vez terminado el registro, no podrá volver a editar la propiedad ni sus elementos
									      </DialogContentText>
									    </DialogContent>
									    <DialogActions>
									      <Button onClick={handleCloseTerminar} color="primary">
									        Cancelar
									      </Button>
									      <Button onClick={handleAccept} color="primary" autoFocus>
									        Aceptar
									      </Button>
									    </DialogActions>
									  </Dialog>

								</div>
								</div>
							:
							<h1>No hay áreas para mostrar</h1>
						}
				


			</div>
		)

	}

	
}

export default withRouter(AreasRegistradas)