import React from 'react'
import styled from "styled-components";

import {  
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import WeekendIcon from '@material-ui/icons/Weekend';
import "@atlaskit/css-reset";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BathtubIcon from '@material-ui/icons/Bathtub';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import HomeIcon from '@material-ui/icons/Home';

var AreaIcon = ""
var AreaColor =""
const Container = styled.div`

  border: 1px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.inputColor || "palevioletred"};
`;
export default function Area (props){
  const {area, areasTerminadas, index, handleClickToItems} = props

  
  // TODO:Cambio de Color de los rectángulos en Lista reordenable
  switch (area.type){
    case "bano":
      AreaIcon = <BathtubIcon />
      AreaColor = "#2196f3"
      break;
    case "cocina":
      AreaIcon = <RestaurantIcon />
      AreaColor = "#ff9800"
      break;
    case "dormitorio":
      AreaIcon = <HotelIcon />
      AreaColor = "#00bcd4"
      break;
    case "comunes":
      AreaIcon = <WeekendIcon />
      AreaColor = "#3f51b5"
      break;
    case "aireLibre":
      AreaIcon = <LocalFloristIcon />
      AreaColor = "#ffc107"
      break;
    case "entrada":      
      AreaIcon = <MeetingRoomIcon />
      AreaColor = "#4caf50"
      break;
    case "otros":      
      AreaIcon = <HomeIcon />
      AreaColor = "#9c27b0"
      break;
    default:
      AreaIcon = <WeekendIcon />      
      break;

  }

  
// const finalIcon = AreaIcon
// const finalColor = AreaColor
 
  return(
    <Container
      inputColor={areasTerminadas.includes(area.name) ?  AreaColor : "#D3D3D3" }
      onClick={() => !areasTerminadas.includes(area.name) && handleClickToItems(area.name, area.type, area.propertyAreaId)}
    >
      <ListItem >
          <ListItemIcon>
            {AreaIcon}
          </ListItemIcon>
          <ListItemText
            primary={area.name}          
          />              
        </ListItem>
    </Container>
  )
}