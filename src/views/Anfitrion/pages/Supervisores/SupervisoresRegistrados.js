import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
});



export default function SupervisoresRegistrados(props) {
  const classes = useStyles();

  if(props.supervisores.length){
    let supervisores = props.supervisores
    return (
      <TableContainer className={classes.table}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Correo</TableCell>              
              <TableCell align="right">Acciones</TableCell>            
            </TableRow>
          </TableHead>
          <TableBody>
            {supervisores.map((value) => (
              <TableRow key={value.user_id}>
                <TableCell align="right">
                  <Avatar
                    alt={`Avatar de ${value.name}`}
                    src={value.picture}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {value.name}
                </TableCell>
                <TableCell align="right">{value.email}</TableCell>
                
                <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton aria-label="edit" onClick={() => console.log("edit")}>
                        <EditIcon  />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Borrar">
                      <IconButton aria-label="edit" onClick={() => console.log("Borrar")}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  }else{
    return(
      <div>Loading...</div>
    ) 
  }
  
}
