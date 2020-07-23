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
  texto: {
    margin: theme.spacing(1),
  }
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

	 	if (mounted) {
            getAreas();
        }
        return function cleanup() {
            mounted = false
        }
	    
	  }, []);

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
								      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
								        
								      </GridListTile>
								      {data && data.map((tile) => (
								        <GridListTile key={tile.propertyAreaId}>  
								                                                     
								        
								        <Link to={`/Anfitrion/ElementosDeArea/${tile.propertyAreaId}/${tile.name}`}>
								        	<img src={image} alt={tile.propertyAreaId} 			        		 
								        		 className={"MuiGridListTile-tile"}
								        	/>
								        </Link>
								        
								          
								          <GridListTileBar
								            title={tile.name}						            
		          							subtitle={<span> {tile.orderIndex}</span>}
								            
								            actionIcon={
								              <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
								                <InfoIcon />
								              </IconButton>                  
								            }
								          />
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