import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import CardFolios from './CardFolios'
import { Link } from "react-router-dom";
import Loader from '../../components/Loader'
import CardFoliosUsed from './components/CardFoliosUsed'



function FoliosRegistrados({match}){
	
	const {hostId, hostName} = match.params
	console.log(hostId)
	console.log(hostName)
	const { getAccessTokenSilently } = useAuth0();
	const [folios, setFolios] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
	    const fetchData = async () => {
	      try {
		      const token = await getAccessTokenSilently();	      
		      const response = await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/desinfectiontickets/retrieve/${hostId}`, {
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
	     };
	 
	    fetchData();
	  }, []);

	const FoliosDengue = folios.filter(item => item.tipoServicio === "Dengue")
	const FoliosLimpieza = folios.filter(item => item.tipoServicio === "Limpieza")
	const FoliosDesinfeccion = folios.filter(item=> item.tipoServicio === "Desinfeccion" )
	console.log("FoliosDengue", FoliosDengue.length)
	console.log("FoliosLimpieza", FoliosLimpieza.length)
	console.log("FoliosDesinfeccion", FoliosDesinfeccion.length)
	const usado = folios.filter(item => item.used === true)
	const sinUsar = folios.filter(item => item.used === false)

	if (loading){
		return <Loader />

	}else{
		return(
			<div>
				<h1>Folios Registrados de {hostName} </h1>
				<CardFolios servicio={"Dengue"} numFolios={FoliosDengue.length} hostId={hostId}/>
				<CardFolios servicio={"Limpieza"} numFolios={FoliosLimpieza.length} hostId={hostId}/>
				<CardFolios servicio={"Desinfeccion"} numFolios={FoliosDesinfeccion.length} hostId={hostId}/>
				<CardFoliosUsed servicio={"Usados"} numFolios={usado.length} hostId={hostId}/>
				<CardFoliosUsed servicio={"Sin Usar"} numFolios={sinUsar.length} hostId={hostId}/>
				<Button component={Link} to={"/Admin"}>Atrás</Button>
			</div>
		)

	}
	
}
export default FoliosRegistrados