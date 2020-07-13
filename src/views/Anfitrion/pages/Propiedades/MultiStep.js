import React, {useState} from 'react'
import AgregarPropiedad from './AgregarPropiedad'
import AgregarArea from './AgregarArea'
import AreasRegistradas from './AreasRegistradas'
import PropiedadesRegistradas from './PropiedadesRegistradas'
import Button from '@material-ui/core/Button';



function MultiStep(){
	const[step, setStep] = useState(0)
	const [propName, setPropName]= useState("")
  	const [adress, setAdress] = useState("")
  	const [propertyId, setPropertyId] = useState("")
  	
  	const [areaName, setAreaName] = useState("")


	const nextStep = () => {
		setStep(step + 1)
	}

	const prevStep = () => {
		setStep(step - 1)
	}
	const nextNextStep = () => {
		setStep(step + 2)
	}
	const prevPrevStep = () => {
		setStep(step - 2)
	}

	const handleChange = input => e =>{
		const {value} = e.target
		switch(input){
			case 'propName':
				setPropName(value)
				break			
			case 'adress':
				setAdress(value)
				break
			case 'areaName':
				setAreaName(value)
				break
			

			
		}
	}
	const getPropertyId = propId => {
		setPropertyId(propId)		
	}
	

	const values = {propName, adress, areaName, propertyId}
	switch(step){
			case 0:
				return(
					<div>
						<PropiedadesRegistradas 
							handleChange={handleChange}
							getPropertyId = {getPropertyId}
							nextNextStep = {nextNextStep}
							values={values}
						/>
						<Button variant="contained" onClick={nextStep}>Agregar Propiedad</Button>
						
					</div>
				)
			case 1:
				return(
					<div>
						<AgregarPropiedad 
							handleChange={handleChange}
							getPropertyId = {getPropertyId}
							nextStep = {nextStep}
							values={values}
						/>
						
					</div>
				)
			case 2:
				return(
					<AreasRegistradas 
							values={values}	
							nextStep = {nextStep}
							prevStep = {prevStep}
							/>
				)
			case 3:
				return(
					<div>
						<AgregarArea 
							handleChange={handleChange}
							nextStep = {nextStep}
							prevStep = {prevStep}	
							values={values}					
						/>
						<h1>propertyId: {propertyId}</h1>
						
					</div>

				)
		}
}
export default MultiStep

