import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import CardFolios from '..//components/CardFolios.js'
import CardFoliosUsed from '../components/CardFoliosUsed'
import Loader from '../../../components/Loader.js'
import * as jwt_decode from 'jwt-decode';




function Folios(){
	const { getAccessTokenSilently } = useAuth0();
	const [hostId, setHostId] = useState()
	
	const [folios, setFolios] = useState([])
	const [loading, setLoading] = useState(true)

	


	useEffect(() => {		
		const fetchData = async () => {    	
			try {
			  const token = await getAccessTokenSilently();		      
			  var decoded = await jwt_decode(token);	      
			  setHostId(decoded.sub)
			  const response = await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/desinfectiontickets/retrieve/${decoded.sub}`, {
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
		}

		fetchData();
	}, []);



	const FoliosDengue = folios.filter(item => item.tipoServicio === "Dengue")
	const FoliosLimpieza = folios.filter(item => item.tipoServicio === "Limpieza")
	const FoliosDesinfeccion = folios.filter(item=> item.tipoServicio === "Desinfeccion" )

	const usado = folios.filter(item => item.used === true)
	const sinUsar = folios.filter(item => item.used === false)
	

	if (loading){
		return <Loader />
	}else{
		return(
			<div>				
				<CardFolios servicio={"Dengue"} numFolios={FoliosDengue.length} hostId={hostId}/>
				<CardFolios servicio={"Limpieza"} numFolios={FoliosLimpieza.length} hostId={hostId}/>
				<CardFolios servicio={"Desinfeccion"} numFolios={FoliosDesinfeccion.length} hostId={hostId}/>
				<CardFoliosUsed servicio={"Usados"} numFolios={usado.length} hostId={hostId}/>
				<CardFoliosUsed servicio={"Sin Usar"} numFolios={sinUsar.length} hostId={hostId}/>				
			</div>
		)

	}
	
}
export default Folios