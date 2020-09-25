import React from 'react'
import Login from './Login.js'
import logo from '../assets/icono SIN FONDO_Mesa de trabajo 1.png'
export default function (){
	//TODO:Cambio de diseño de página de inicio de sesión

	return(
		<div style={{
				  position: "absolute",
				  left: "50%",
				  top: "50%",
				  transform: "translate(-50%, -50%)",				  
				  textAlign: "center",


		}}>
			<img src={logo} style={{width:"300px"}} alt="Covid19Free Logo"/>
			<h1 style={{color: "white"}}>Bienvenido</h1>
			<Login /> 
		</div>

	)
}