import React from "react";
import { Draggable } from "react-beautiful-dnd";
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
import TvIcon from '@material-ui/icons/Tv';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import HomeIcon from '@material-ui/icons/Home';
import styled from "styled-components";

var AreaIcon = ""
var AreaColor =""

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.inputColor || "palevioletred"};
`;


function Area(props) {
  const {area, index, removeItem} = props

  

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

  
const finalIcon = AreaIcon
const finalColor = AreaColor

  
  return (
      <Draggable draggableId={props.area.orderIndex} index={props.index}>
        {provided => (
          <Container
            inputColor={finalColor}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
      <ListItem >
          <ListItemIcon>
            {finalIcon}
          </ListItemIcon>
          <ListItemText
            primary={props.area.name}          
          />
          <ListItemSecondaryAction>          
            <IconButton onClick={()=>removeItem(index)}>
              <DeleteForeverIcon />
            </IconButton>
          </ListItemSecondaryAction>
          
          
        </ListItem>
          </Container>
        )}
      </Draggable>
    )
}

export default Area;
