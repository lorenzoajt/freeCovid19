import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {bano, comunes, cocina, dormitorio, aireLibre, entrada, otros} from './defaultItems'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function AgregarItems({match}, props){


	
	const {areaId, propertyId, areaType} = match.params

	
	const classes = useStyles();
	let listType;
	switch(areaType){
		case "Baño":
			listType = bano
			break
		case "Cocina":
			listType = cocina
			break
		case "Dormitorio":
			listType = dormitorio
			break
		case "Zonas Comunes":
			listType = comunes
			break
		case "Zonas Aire Libre":
			listType = aireLibre
			break
		case "Entrada y recibidor":
			listType = entrada
			break
		case "Otros":
			listType = otros
			break	
	}

	const [state, setState] = useState({
		allChecked: false,
		list: listType
	})

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

	return(
		<div>
		
		<FormControl component="fieldset" className={classes.formControl}>
			<FormLabel component="legend">Elija elementos a desinfectar para {areaType} </FormLabel>
			<FormGroup>
			  <FormControlLabel
			    control={<Checkbox checked={state.allChecked} onChange={handleChange} name="checkAll" />}
			    label={"Seleccionar Todo"} />

			  {state.list.map((item) => {
			    return (
			    <FormControlLabel
			    control={<Checkbox checked={item.isChecked} onChange={handleChange} name={item.name} />}
			    label={item.name}
			    />
			    )
			  })}
			</FormGroup>
		</FormControl> 
		<div>
			<Button component={Link} to={`/ItemsAreasRegistradas/${propertyId}`}>Atrás</Button>
		</div>
		</div>
	)
}

export default AgregarItems














