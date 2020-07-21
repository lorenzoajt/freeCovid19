import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Loader from './../../../components/Loader'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image from '../../../assets/ICONO con circulo_Mesa de trabajo 1.png'


function Historial(){
  const [loading, setLoading] = useState(false)//cambiar a true

 
  if(loading){
    return <Loader />
  }else{
    return(
     <div>
     Historial
      </div>


    )

  }
  
  
}

export default Historial