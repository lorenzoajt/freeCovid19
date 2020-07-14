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


function AreasRegistradas({match}){
	let history = useHistory();
	
	const { getAccessTokenSilently } = useAuth0();
	const [areaNum, setAreaNum] = useState()
	const {propertyId} = match.params
	

	const [data, setData] = useState()

	useEffect(() => {
		let mounted = true;
		if(mounted){
			getAreas()	
		}
		return () => mounted = false;
	},[data]);


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
	}));
	const classes = useStyles();

	return(	
		<div>	
			<h1>Areas Registradas</h1>	
			{areaNum > 0 ? <div className={classes.root}>
							
						        
						    <GridList cellHeight={180} className={classes.gridList}>
						      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
						        
						      </GridListTile>
						      {data && data.map((tile) => (
						        <GridListTile key={tile.propertyAreaId}>  
						                                                     
						        
						        <Link to={`/ElementosDeArea/${tile.propertyAreaId}`}>
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
						<h1>No hay áreas para mostrar</h1>
					}
			<div>
				<Button onClick={() => history.goBack()}>Atras</Button>
			    {/*<Button component={Link} to={`/AgregarArea/${propertyId}`}>Agregar Area</Button>*/}
			</div>


		</div>
	)
}

export default AreasRegistradas