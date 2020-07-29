import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../../../../components/Loader'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
	  minWidth: 275,
	  margin: '0 10px 10px 10px',
	  display: 'inline-block',    
	},
	bullet: {
	  display: 'inline-block',
	  margin: '0 2px',
	  transform: 'scale(0.8)',
	},
	title: {
	  fontSize: 14,
	},
	pos: {
	  marginBottom: 12,
	},
	texto: {
	  margin: theme.spacing(1),
	}
  
}));


function ElementosDeArea({match}){	
	const {areaId, areaName} = match.params
	const { getAccessTokenSilently } = useAuth0();
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)
	const classes = useStyles();

	useEffect(() => {
	    const getItems = async () => {
	    try {
	      const token = await getAccessTokenSilently();	  
	      const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/propertyareaitems/${areaId}`, {
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
	 
	    getItems();
	  }, []);


	if(loading){
		return <Loader />
	}else{
		if(data.length > 0){
			return(
				<div>
					<Typography variant="h3"className={classes.texto} gutterBottom>
				       Elementos de {areaName}
				     </Typography>		
				     <Grid container 
				     	   justify="flex-start"
	  					   alignItems="flex-start"
	  					   spacing={3}>    
	  					   
					{data.map(item => (
						<Grid key = {item.name} item xs={3}>
							<Card  className={classes.root}>
								<CardContent>      
									<Typography variant="h5" component="h2">
									{item.name}
									</Typography>                       
								</CardContent>
								<CardActions>
									<Typography variant="body2" component="p">
									Requiere Evidencia 
									</Typography> 
									{item.evidence ? <CheckCircleIcon /> : <CancelIcon /> }
								</CardActions>
							</Card>
						</Grid>

					)					
					)}
					</Grid>

				</div>
			)

		}else{
			return(
					<Typography variant="h3"className={classes.texto} gutterBottom>
				       {areaName} no tiene elementos registrados
				     </Typography>	

			)
		}
		

	}
	
}

export default ElementosDeArea