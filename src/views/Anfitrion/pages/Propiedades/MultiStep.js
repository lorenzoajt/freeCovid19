import React, {useState} from 'react'
import { Prompt } from "react-router-dom";
import AgregarPropiedad from './AgregarPropiedad'
import AgregarArea from './AgregarArea/'
import ItemsAreasRegistradas from './AgregarArea/ItemsAreasRegistradas'
import AgregarItems from './AgregarArea/AgregarItems'


export default function Multistep(){
	const [step, setStep] = useState(0)
	const [propertyId,setPropertyId] = useState("")
	const [areasTerminadas, setAreasTerminadas] = useState([])
	
	const [areaName, setAreaName] = useState("")
	const [type, setType]= useState("")
	const [propertyAreaId,setPropertyAreaId]= useState("")

	
	const [numAreas, setNumAreas] = useState(0)

	const nextStep = e => {	
		setStep(step + 1)
	}
	const prevStep = () => {
		setStep(step - 1)			
	}

	const handlePropertyId = (id) => {
		setPropertyId(id)		
	}
	const handleAreasTerminadas = (area) => {
	  setAreasTerminadas([...areasTerminadas, area])    
	}

	const handleName = (name) => {
		setAreaName(name)
	}
	const handleType = (type) => {
		setType(type)
	}
	const handlePropertyAreaId = (propertyAreaId) => {
		setPropertyAreaId(propertyAreaId)
	}

	const handleNumAreas = num => {
		setNumAreas(num)
	}
	
	

	switch(step){
		case 0:
			return(
				<div>					
					<AgregarPropiedad nextStep= {nextStep} handlePropertyId={handlePropertyId}/>
					
				</div>
			)
		case 1:
			return(
				<div>
					<Prompt message={"Los cambios no seran guardados"}/>
					<AgregarArea 
						propertyId={propertyId} 
						nextStep={nextStep}
						handleNumAreas={handleNumAreas}
					/>					
				</div>
			)
		case 2:
			return(
				<div>
					
					<ItemsAreasRegistradas 
						propertyId={propertyId} 
						nextStep={nextStep} 
						areasTerminadas={areasTerminadas} 
						handleType={handleType} 
						handleName={handleName} 
						handlePropertyAreaId={handlePropertyAreaId}
						numAreas = {numAreas}
						/>															
				</div>
			)
		case 3:
			return(
				<div>
					<Prompt message={"Los cambios no seran guardados"}/>
					<AgregarItems 
						prevStep={prevStep} 
						handleAreasTerminadas={handleAreasTerminadas} 
						areaId={propertyAreaId} 
						propertyId={propertyId} 
						areaType={type} 
						areaName={areaName}						
						/>						
				</div>
			)
		default:
			return <h1>yasss</h1>
	}

}