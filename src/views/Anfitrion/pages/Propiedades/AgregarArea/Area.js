import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";
import WeekendIcon from '@material-ui/icons/Weekend';
import "@atlaskit/css-reset";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BathtubIcon from '@material-ui/icons/Bathtub';
import KitchenIcon from '@material-ui/icons/Kitchen';
import HotelIcon from '@material-ui/icons/Hotel';
import TvIcon from '@material-ui/icons/Tv';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import RoomIcon from '@material-ui/icons/Room';

let AreaIcon = ""
let AreaColor =""
const getItemStyle = (isDragging, draggableStyle) => ({
  background: `${AreaColor}`,
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
  
});




function Area(props) {
  const {area, index, removeItem} = props

  

  switch (area.type){
    case "bano":
      AreaIcon = <BathtubIcon />
      AreaColor = "#2196f3"
      break;
    case "cocina":
      AreaIcon = <KitchenIcon />
      AreaColor = "#ff9800"
      break;
    case "dormitorio":
      AreaIcon = <HotelIcon />
      AreaColor = "#00bcd4"
      break;
    case "comunes":
      AreaIcon = <TvIcon />
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
      AreaIcon = <RoomIcon />
      AreaColor = "#9c27b0"
      break;
    default:
      AreaIcon = <WeekendIcon />      
      break;

  }


  
  return (
    <Draggable draggableId={props.area.orderIndex} index={props.index}>
      {(provided, snapshot) => (
        <ListItem
        ContainerComponent="li"
        ContainerProps={{ ref: provided.innerRef }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}  
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}      
      >
        <ListItemIcon>
          {AreaIcon}
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
      )}
    </Draggable>
  );
}

export default Area;
