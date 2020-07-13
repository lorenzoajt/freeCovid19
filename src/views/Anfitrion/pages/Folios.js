import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import * as jwt_decode from 'jwt-decode'


function Folios(){
	
	const { getAccessTokenSilently } = useAuth0();
	const [folios, setFolios] = useState([])
	useEffect(() => {
	  (async () => {
	    try {
	      const token = await getAccessTokenSilently();	      
	      const decoded = jwt_decode(token)
	      const hostId = decoded.sub
	      const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/desinfectiontickets/retrieve/${hostId}`, {
				headers: {
				Authorization: `Bearer ${token}`
				}
			});

			const responseData = await response.json();
			
			setFolios(responseData.items)
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
	return(
		<div>
			<h1>FoliosRegistrados</h1>		
			<br/>
			<br/>
			<h2>Folios Dengue: {FoliosDengue.length}</h2>
			<h2>Folios Limpieza: {FoliosLimpieza.length}</h2>
			<h2>Folios Desinfeccion: {FoliosDesinfeccion.length}</h2>
			<h2>Usados: {usado.length}</h2>
			<h2>Sin Usar: {sinUsar.length}</h2>
		</div>
	)
}

export default Folios