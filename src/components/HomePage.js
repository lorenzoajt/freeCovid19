import React from 'react'
import Login from './Login.js'
import logo from '../assets/icono SIN FONDO_Mesa de trabajo 1.png'
export default function (){

	return(
		<div style={{
				  position: "absolute",
				  left: "50%",
				  top: "50%",
				  transform: "translate(-50%, -50%)",				  
				  textAlign: "center",


		}}>
			<img src={logo} style={{width:"300px"}}/>
			<h1 style={{color: "white"}}>Bienvenido</h1>
			<Login /> 
		</div>

	)
}