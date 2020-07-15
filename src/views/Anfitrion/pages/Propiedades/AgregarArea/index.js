import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "@atlaskit/css-reset";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import columnData from './columnData'
import Column from './Column'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Dropdown from './Dropdown.js'
import {defaultAreas} from './defaultAreas'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  console.log("result", result)
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function AreasRegistradasDnD({match}) {
  const [areas, setAreas] = useState(defaultAreas);
  const [newArea, setNewArea] = useState("")
  const { getAccessTokenSilently } = useAuth0();
  const {propertyId} = match.params
  const [areaType, setAreaType] = React.useState('');

  const handleChangeAreaType = (event) => {
    setAreaType(event.target.value);
  };
  

  const addArea = () => {
    setAreas([
      ...areas,
      {
        name: newArea,
        id: areas.length.toString(),
        type: areaType
        
      }
    ]);
  };

  const handleChange = event =>{
    setNewArea(event.target.value)
  }
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      areas,
      result.source.index,
      result.destination.index
    );
    console.log(items)
    setAreas( items );
  }
  
  function fillAPI(){
    areas.forEach(area => {
      sendToAPI(areas.indexOf(area), area.name ) //mandarle area.type
    }  
    )        
  }
  
            

  async function sendToAPI (id, name){
    try {  
    const token = await getAccessTokenSilently();  
    const post = {
        "name": name, 
        "orderIndex": id.toString() /////recibir area.type
    }
    const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/propertyareas/${propertyId}`, {
      method: 'POST',
      body: JSON.stringify(post),
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    const responseData = await response.json();
    console.log(responseData)
    
    } catch (error) {
    console.error(error);
    }
  };
  const check = () => {
    if(  areaType === "" || newArea === "" ){
      return true
    }else{
      return false
    }
  }

  return (
    <>      
    <DragDropContext onDragEnd={onDragEnd}>
      {areas && columnData.columnOrder.map(columnId => {
        const column = columnData.columns[columnId];

        return <Column key={columnId} column={column} areas={areas} />;
      })}
    </DragDropContext>
      <form  noValidate autoComplete="off">
    
    <TextField id="standard-basic" label="Standard" onChange={handleChange}/>

    <Dropdown areaType={areaType} handleChangeAreaType={handleChangeAreaType}/>

    <Button 
      variant="contained" 
      onClick={addArea}
      disabled={check()}
    >Agregar</Button>    
    <Button 
      variant="contained" 
      onClick={fillAPI}
      component={Link} to={`/AreasRegistradas/${propertyId}`}
      >Confirmar orden
      </Button>
  </form>

    </>
  );
}

