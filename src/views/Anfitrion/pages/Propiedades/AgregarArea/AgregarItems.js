import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {bano, comunes, cocina, dormitorio, aireLibre, entrada, otros} from './defaultItems'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useAuth0 } from "@auth0/auth0-react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  card: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(1),
  },
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },    
}));

function AgregarItems(props){
	const { getAccessTokenSilently } = useAuth0();	
	const {areaId, propertyId, areaType, areaName, handleAreasTerminadas, prevStep} = props
	const [open, setOpen] = useState(false);//snackbar open hook
	const [openError, setOpenError] = useState(false);//snackbar open hook
	const [message, setMessage] = useState("")
	const [status, setStatus] = useState()
	const [loading, setLoading] = useState(false)

	

	const classes = useStyles();
	let listType;
	switch(areaType){
		case "bano":
			listType = bano
			break
		case "cocina":
			listType = cocina
			break
		case "dormitorio":
			listType = dormitorio
			break
		case "comunes":
			listType = comunes
			break
		case "aireLibre":
			listType = aireLibre
			break
		case "entrada":
			listType = entrada
			break
		case "otros":
			listType = otros
			break	
		default:
			listType = [
			  {
			   name: "",
			   isChecked: false,
			   evidence: false
			 },			  
			]
			break
	}

	const [state, setState] = useState({
		allChecked: true,
		list: listType////aqui esta el bug
	})
	const [name, setName] = useState("")
	let selectedElements = state.list.filter(items => items.isChecked) // filter selected elements    

	const handleChange = e => {
	    let itemName = e.target.name;
	    let checked = e.target.checked;
	    setState(prevState => {
	      let { list, allChecked } = prevState;
	      if (itemName === "checkAll") {
	        allChecked = checked;
	        list = list.map(item => ({ ...item, isChecked: checked }));
	      } else {
	        list = list.map(item =>
	          item.name === itemName ? { ...item, isChecked: checked } : item
	        );
	        allChecked = list.every(item => item.isChecked);
	      }
	      return { list, allChecked };
	    });
	  };

	const nameIsRepeated = () => {
	    const names = state.list.map(item => item.name)
	    if(names.includes(name)){
	      return true
	    }else{
	      return false
	    }
	  }
	const addItem = () => {
		if(nameIsRepeated()){
		  setOpenError(true)
		}else{
		  const newList = [].concat(state.list)
		  newList.push({
		    name: name,
		    isChecked: false,     
		    evidence: false
		  })
		  setName("")
		  setState(prevState=>      
		    ({
		      allChecked: prevState.allChecked,
		      list: newList,
		    })
		  );    
		} 
	}

	const handleDelete = (itemIndex) =>{ 
		const newList = [].concat(state.list) 
		newList.splice(itemIndex, 1);
		setState(prevState=>      
		  ({
		    allChecked: prevState.allChecked,
		    list: newList,
		  })
		);
	}

	const handleSwitch = (event) => {
		let itemName = event.target.name;
		let checked = event.target.checked;
		setState(prevState => {
		  let { list, allChecked} = prevState;      
		  list = list.map(item =>
		    item.name === itemName ? { ...item, evidence: checked, isChecked:checked } : item
		  );              
		  return { list, allChecked };
		});
	}

	const handleClose = (event, reason) => {// snackbar close function
	    if (reason === 'clickaway') {
	      return;
	    }

	    setOpen(false);
	    setOpenError(false);
	  };


	const handlePost = async () => {
		setLoading(true)
		try {		
		const listToAPI = selectedElements.map(item =>( // removing unwanted property
		      {
		        name: item.name,     
		        evidence: item.evidence 
		      }
		    ))
	    let post = {items: listToAPI}
	    console.log(post)
	    handleAreasTerminadas(areaName)
		const token = await getAccessTokenSilently();		
		const response = await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod//propertyareaitems/${areaId}/${propertyId}`, {
			method: 'POST',
			body: JSON.stringify(post),
		  	headers: {
		    	Authorization: `Bearer ${token}`
		  	}
		});
		setStatus(response.status)
		const responseData = await response.text();		
		setOpen(true)
		setMessage(responseData)	
		setLoading(false)
		prevStep()

		} catch (error) {
		console.error(error);
		}
		};


	return(

		<div>

		
		<TextField		            
		  value={name}
		  label="Nombre"
		  helperText="Nombre de elemento a Agregar"
		  onChange={event=> setName(event.target.value)}
		  className={classes.text}
		/>
		
		<Button 
	    	className={classes.button}
	        variant="contained"            
	        color='primary' 
	        disabled={name === ""} 
	        onClick={addItem}
        >Agregar Item</Button>
		<FormControl component="fieldset" className={classes.formControl}>
			<FormLabel component="legend">Elija elementos a desinfectar para {areaName} </FormLabel>
			<FormGroup>
			  <FormControlLabel
			    control={<Checkbox checked={state.allChecked} onChange={handleChange} name="checkAll" color="primary"/>}
			    label={"Seleccionar Todo"} />

			  {state.list.map((item, index) => {
			              return (
			                <Card key={index} className={classes.card}>
			                <CardContent>      
			                <FormControlLabel
			                  control={<Checkbox checked={item.isChecked} onChange={handleChange} name={item.name} color="primary"/>}
			                  label={item.name}
			                  />  
							<IconButton onClick={()=>handleDelete(index)}>
								<DeleteIcon />
							</IconButton>    
			                </CardContent>
			                <CardActions>
			                <FormControl>
			                <FormGroup>        
			                  <FormControlLabel
			                    value="end"
			                    control={<Switch checked={item.evidence} color="primary" onChange={handleSwitch} name={item.name}/>}
			                    label="Requiere evidencia"
			                    labelPlacement="start"
			                  />
			                </FormGroup>
			              </FormControl>
			                </CardActions>
			              </Card>
			              )
			            })}			  
			</FormGroup>
		</FormControl> 
		<div>
			
			<Button color="primary" variant="contained" className={classes.button} disabled={selectedElements.length === 0} onClick={handlePost}>Confirmar</Button>
		</div>
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
		  <Alert onClose={handleClose} severity={status=== 201 ? "success" : "warning" }>
		    {message}
		  </Alert>
		</Snackbar>
		<Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
			  No se pueden tener elementos con el mismo nombre
			</Alert>
		</Snackbar>		
			<Backdrop className={classes.backdrop} open={loading}>
			  <CircularProgress color="inherit" />
			</Backdrop>		
		</div>
	)
}

export default AgregarItems














