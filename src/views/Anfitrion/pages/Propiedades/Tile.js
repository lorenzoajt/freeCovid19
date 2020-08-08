import React, {useState, useEffect} from 'react'
import GridListTile from '@material-ui/core/GridListTile';
import { Link } from "react-router-dom";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import defaultHouse from '../../../../assets/defaultImage.jpeg'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },    
  }));

function Tile(props){
  const { getAccessTokenSilently } = useAuth0();
  const {tile, getPropiedades} = props  
  const [imgSrc, setImgSrc] = useState('');  
  const defaultImage = defaultHouse
  const [openDelete, setOpenDelete] = React.useState(false); // para el alert dialog
  const [openEdit, setOpenEdit] = React.useState(false); // para el alert dialog
  const [propName, setPropName] = useState("")
  const [propAdress, setPropAdress] = useState("")
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    const getFoto = async (propId) =>{          
      try{
        const token = await getAccessTokenSilently()    
        const url = `https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/properties/${propId}/images`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = await response.json()        
        if(responseData.items.length > 0){
          setImgSrc(responseData.items[0].imageUrl)  
        }else{          
          setImgSrc(defaultImage)
        }
        
        
      }catch(error){        
        console.log(error)

      } 
      }

    getFoto(tile.propertyId);
  }, []);


    
    const classes = useStyles();



    ///////////eliminar

    const eliminar = async (propertyId) => {
      setOpen(true)
      handleCloseDelete() 
      try {
        const URL = `https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/properties/${propertyId}`
        const token = await getAccessTokenSilently();       
        await axios.delete(URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }                    
        });     
        setOpen(false) 
        getPropiedades()//update properties
      } catch (error) {
      console.error(error);
      }
    };    
    ///////////
    ///////////editar
    
    const editar = async (propertyId) => {
      setOpen(true)
      handleCloseEdit()
      try {
      const token = await getAccessTokenSilently();
      const post = {
        "propertyName": propName,
        "address": propAdress
      }
      
      await fetch(`https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/properties/${propertyId}`, {
        method: 'PATCH',
        body: JSON.stringify(post),
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      setOpen(false)
      getPropiedades()//update properties
      } catch (error) {
      console.error(error);
      }
    };

    const check = () => {      
        if(propName === "" || propAdress === ""){
          return true
        }else{
          return false
        }
      }

    ///////////
    const handleCloseEdit = () => {
      setOpenEdit(false);      
    };

    const handleClickOpenEdit = () => {
      setOpenEdit(true);
    };

    const handleCloseDelete = () => {
      setOpenDelete(false);
    };

    const handleClickOpenDelete = () => {
      setOpenDelete(true);
    };
   

  return(
    <div className={"MuiGridListTile-tile"}>
      <GridListTile className={"MuiGridListTile-tile"} >  
                                                 
        <Link to={`/Anfitrion/AreasRegistradas/${tile.propertyId}/${tile.propertyName}`}>
        
          <img  src={imgSrc}                    
                alt={tile.propertyName}                                 
                style={{
                  height: "100%",
                  display: "block",
                  overflow: "hidden",
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
          />
        
        </Link>          
          <GridListTileBar
            title={tile.propertyName}
            subtitle={<span> {tile.address}</span>}
            actionIcon={
              <div>
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={() => handleClickOpenEdit()}>
                  <EditIcon />
                </IconButton>                  
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={() => handleClickOpenDelete()}>
                  <DeleteForeverIcon />
                </IconButton>                  
              </div>
            }
          />
      </GridListTile>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Estas seguro que deseas eliminar permanentemente esta propiedad?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esto significa borrar las áreas y los elementos contenidos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => eliminar(tile.propertyId)} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Propiedad</DialogTitle>
        <DialogContent>
          
        <TextField onChange={e => setPropName(e.target.value)} id="standard-disabled1" margin="dense" label="Nombre" defaultValue={propName} fullWidth/>
        <TextField   onChange={e => setPropAdress(e.target.value)} id="standard-disabled2" margin="dense" label="Dirección" defaultValue={propAdress} fullWidth/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancelar
          </Button>
          <Button disabled={check()} onClick={()=> editar(tile.propertyId)} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
  </div>
      
    
  )

}

export default Tile