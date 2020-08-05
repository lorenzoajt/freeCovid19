import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import Button from '@material-ui/core/Button';
import image from "./apartment-contemporary-couch-curtains-275484.jpg"

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link, useHistory} from "react-router-dom";
import Loader from '../../../../components/Loader.js'
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
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
  texto: {
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
function AreasRegistradas({match}){
	let history = useHistory();
	const classes = useStyles();
	const { getAccessTokenSilently } = useAuth0();
	const [areaNum, setAreaNum] = useState()
	const {propertyId, propertyName} = match.params
	const [loading, setLoading] = useState(true)

	const [data, setData] = useState()
	
	useEffect(() => {
		let mounted = true
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
    	  setAreaNum(responseData.items.length)
    	  setLoading(false)
    	} catch (error) {
    	  console.error(error);
    	}
    	};

	 	if (mounted) {
            getAreas();
        }
        return function cleanup() {
            mounted = false
        }
	    
	  }, []);


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

	if(loading){
		return <Loader />
	}else{
			return(	
				<div>	
					<Typography variant="h3" className={classes.texto}gutterBottom>
				       Areas Registradas de {propertyName}
				     </Typography>		
					
					{areaNum > 0 ? <div className={classes.root}>
									
								        
								    <GridList cellHeight={180} className={classes.gridList}>
								      
								      {data && data.map((tile) => (
								        <GridListTile key={tile.propertyAreaId} >  
								                                                     
								        
								        <Link style={{ textDecoration: 'none' }} to={`/Anfitrion/ElementosDeArea/${tile.propertyAreaId}/${tile.name}`}>
								        	<Card className={classes.cardStyle} style={{background: chooseColor(tile.type)}}>
							        	      <CardContent >        
							        	        <Typography className={classes.cardContent} variant="h4" component="h2">
							        	          {tile.name}
							        	        </Typography>                
							        	      </CardContent>      
							        	    </Card>
								        </Link>								       								          								        
								        </GridListTile>
								      ))
								    }
								    </GridList>
								    
								</div>
								:
								<Typography variant="h3" className={classes.texto}gutterBottom>
							       No hay áreas para mostrar
							     </Typography>								
							}
					<div>
						<Button onClick={() => history.goBack()}>Atras</Button>					    
					</div>


				</div>
			)

	}
	
}

export default AreasRegistradas