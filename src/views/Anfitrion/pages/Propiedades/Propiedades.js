import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import MultiStep from './MultiStep'
import PropiedadesRegistradas from './PropiedadesRegistradas.js'


function Propiedades(){
	

	return(
		<div>
			<PropiedadesRegistradas />
			<Button variant="contained" component={Link} to={'/AgregarPropiedad'}>Agregar Propiedad</Button>

		</div>
	)
}

export default Propiedades