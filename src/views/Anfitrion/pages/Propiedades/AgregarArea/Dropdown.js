import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dropdown(props){
  const classes = useStyles();
  const {areaType, handleChangeAreaType} = props
  
  
  return(
    <FormControl className={classes.formControl}>
      <InputLabel>Tipo de Área</InputLabel>
      <Select
        labelId="areaType"
        id="areaType"
        value={areaType}
        onChange={handleChangeAreaType}
      >
        
        <MenuItem value={"bano"}>Baño</MenuItem>
        <MenuItem value={"cocina"}>Cocina</MenuItem>
        <MenuItem value={"dormitorio"}>Dormitorio</MenuItem>
        <MenuItem value={"comunes"}>Zonas Comunes</MenuItem>
        <MenuItem value={"aireLibre"}>Zonas AireLibre</MenuItem>
        <MenuItem value={"entrada"}>Entrada y Recibidor</MenuItem>
        <MenuItem value={"otros"}>Otros</MenuItem>
      </Select>
      <FormHelperText>Seleccione el tipo de área que desea agregar</FormHelperText>
    </FormControl>

  )
}


