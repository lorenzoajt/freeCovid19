import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardFolios from '../../Admin/CardFolios'
import { Link } from "react-router-dom";
import Loader from '../../../components/Loader.js'
import * as jwt_decode from 'jwt-decode';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

function Folios(){
	const { getAccessTokenSilently } = useAuth0();
	const [hostId, setHostId] = useState()
	
	const [folios, setFolios] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
	  (async () => {
	    try {
	      const token = await getAccessTokenSilently();		      
	      var decoded = await jwt_decode(token);	      
	      setHostId(decoded.sub)
	      const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/desinfectiontickets/retrieve/${decoded.sub}`, {
	        headers: {
	          Authorization: `Bearer ${token}`
	        }
	      });

	      const responseData = await response.json();	      
	      setFolios(responseData.items)
	      setLoading(false)
	    } catch (error) {
	      console.error(error);
	    }
	  })();
	}, []);

	const FoliosDengue = folios.filter(item => item.tipoServicio === "Dengue")
	const FoliosLimpieza = folios.filter(item => item.tipoServicio === "Limpieza")
	const FoliosDesinfeccion = folios.filter(item=> item.tipoServicio === "Desinfeccion" )

	const usado = folios.filter(item => item.used === true)
	const sinUsar = folios.filter(item => item.used === false)
	const classes = useStyles();

	if (loading){
		return <Loader />
	}else{
		return(
			<div>				
				<CardFolios servicio={"Dengue"} numFolios={FoliosDengue.length} hostId={hostId}/>
				<CardFolios servicio={"Limpieza"} numFolios={FoliosLimpieza.length} hostId={hostId}/>
				<CardFolios servicio={"Desinfeccion"} numFolios={FoliosDesinfeccion.length} hostId={hostId}/>
				<CardFolios servicio={"Usados"} numFolios={usado.length} hostId={hostId}/>
				<CardFolios servicio={"Sin Usar"} numFolios={sinUsar.length} hostId={hostId}/>				
			</div>
		)

	}
	
}
export default Folios