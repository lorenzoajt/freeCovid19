import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { DragDropContext } from "react-beautiful-dnd";
import "@atlaskit/css-reset";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import columnData from './columnData'
import Column from './Column'
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Dropdown from './Dropdown.js'
import {defaultAreas} from './defaultAreas'
import Loader from '../../../../../components/Loader'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Prompt } from 'react-router'
import TipOrdenar from './TipOrdenar'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  textArea:{
    margin: theme.spacing(1),
  }
}));
export default function AreasRegistradasDnD({match}) {
  const defAreas = defaultAreas.items
  const [areas, setAreas] = useState(defAreas);
  const [newArea, setNewArea] = useState("")
  const { getAccessTokenSilently } = useAuth0();
  const {propertyId} = match.params
  const [areaType, setAreaType] = React.useState('');
  const classes = useStyles();
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // window.addEventListener('popstate', (event) => {
    
  //   alert("La propiedad está incompleta tendrá que empezar de nuevo");    
  //   history.push('/Anfitrion')
  // });

  const handleChangeAreaType = (event) => {
    setAreaType(event.target.value);
  };
  


  const areaIsRepeated = () => {
      const names = areas.map(item => item.name)
      if(names.includes(newArea)){
        return true
      }else{
        return false
      }
    }
    const addArea = () => {
      if(areaIsRepeated()){
        setOpen(true)
      }else{
        const newlist = [].concat(areas) 
        newlist.push({
            name: newArea,
            orderIndex: areas.length.toString(),
            type: areaType
            
          })
        setAreas(newlist)  
        setNewArea("")   
        setAreaType("")      
      } 
    }



  const removeItem = (itemIndex) => { 
    const newlist = [].concat(areas) 
    newlist.splice(itemIndex, 1);
    setAreas(newlist)
  }

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
    // console.log(items)
    const newList = [].concat(items) 
    // const pos = newList.map(function(e) { return e.orderIndex; }).indexOf('6');
    // console.log("pos", pos)

    const post = newList.map(item => ({
      name: item.name,
      orderIndex: newList.map(function(e) { return e.orderIndex; }).indexOf(item.orderIndex).toString(),////mejorar esto
      type: item.type
    }))
    
    
    setAreas( post );
  }
  
            

  async function sendToAPI (id, name){
    setLoading(true)
    try {  
    const token = await getAccessTokenSilently();  
    const post = {
        items: areas
    }
    const response = await fetch(`https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/propertyareas/${propertyId}`, {
      method: 'POST',
      body: JSON.stringify(post),
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    const responseData = response.text()    
    setLoading(false)
    history.push(`/Anfitrion/ItemsAreasRegistradas/${propertyId}`)

    
    
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
  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
  
  if(loading){
    return <Loader/>

  }else{
    return (
      <>    
      <TipOrdenar />  
      <form  noValidate autoComplete="off">
        
        <TextField 
          value={newArea} 
          id="standard-basic" 
          label="Nombre del Area" 
          onChange={handleChange} 
          className={classes.textArea}/>

        <Dropdown areaType={areaType} handleChangeAreaType={handleChangeAreaType}/>

        <Button 
          variant="contained" 
          onClick={addArea}
          disabled={check()}
          className={classes.button}
        >Agregar</Button>   
        <br/> 
        <Button 
          variant="contained" 
          onClick={sendToAPI}      
          color="primary" className={classes.button}
          >Confirmar orden
          </Button>
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        {areas && columnData.columnOrder.map(columnId => {
          const column = columnData.columns[columnId];

          return <Column key={columnId} column={column} areas={areas} removeItem={removeItem}/>;
        })}
      </DragDropContext>
    
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          No se pueden tener áreas con el mismo nombre
        </Alert>
      </Snackbar>
      </>
    );

  }
  
}

