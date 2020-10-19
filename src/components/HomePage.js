import React from 'react'
import Login from './Login.js'
import logo from '../assets/icono SIN FONDO_Mesa de trabajo 1.png'
export default function (){
	//DONE:Cambio de diseño de página de inicio de sesión - finish----

	return(
		<div id="wrap-login">
			<div id="login">
				<img src={logo} id="img-login" alt="Covid19Free Logo"/>
				<h1>Bienvenido</h1>
					<Login />
			</div>
		</div>

	)
}