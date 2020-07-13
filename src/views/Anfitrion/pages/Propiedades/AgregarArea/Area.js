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

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});


function Area(props) {
  
  return (
    <Draggable draggableId={props.area.id} index={props.index}>
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
          <WeekendIcon />
        </ListItemIcon>
        <ListItemText
          primary={props.area.name}          
        />
        <ListItemSecondaryAction>
          <IconButton onClick={()=>console.log("edit")}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={()=>console.log("delete")}>
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>
        
      </ListItem>
      )}
    </Draggable>
  );
}

export default Area;
