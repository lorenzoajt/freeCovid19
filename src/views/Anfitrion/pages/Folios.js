import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import CardFolios from '..//components/CardFolios.js'
// import CardFoliosUsed from '../components/CardFoliosUsed'
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
	}, [getAccessTokenSilently]);



	const FoliosDengue = folios.filter(item => item.tipoServicio === "Dengue" && item.used === true)
	// const FoliosLimpieza = folios.filter(item => item.tipoServicio === "Limpieza")
	const FoliosDesinfeccion = folios.filter(item=> item.tipoServicio === "Desinfeccion" && item.used === true)

	// const usado = folios.filter(item => item.used === true)
	const sinUsar = folios.filter(item => item.used === false)
	
	const styleHeader = {
		fontSize: "2rem",
		textAlign: "center",
		fontWeight: "bold",
		marginTop: "30px",
	}

	const styleSubheader = {
		fontSize: "1.5rem",
		textAlign: "center",
		fontWeight: "bold",
		marginTop: "10px",
	}

	const styleRow = {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly"
	}

	if (loading){
		return <Loader />
	}else{
		// TODO: Cambiar estilos de página de Folios
		// ALMOST FINISHED
		return(
			<div>		
				<div style={ styleHeader }>
					FOLIOS DISPONIBLES { sinUsar.length }
				</div>	
				<div style={ styleSubheader }>
					Folios Utilizados
				</div>
				<div style={styleRow}>
					<CardFolios servicio={"Desinfeccion"} numFolios={FoliosDesinfeccion.length} hostId={hostId}/>
					<CardFolios servicio={"Dengue"} numFolios={FoliosDengue.length} hostId={hostId}/>
					{/* <CardFolios servicio={"Limpieza"} numFolios={FoliosLimpieza.length} hostId={hostId}/> */}
					{/* <CardFoliosUsed servicio={"Usados"} numFolios={usado.length} hostId={hostId}/> */}
					{/* <CardFoliosUsed servicio={"Sin Usar"} numFolios={sinUsar.length} hostId={hostId}/>				 */}
				</div>		
			</div>
		)

	}
	
}
export default Folios