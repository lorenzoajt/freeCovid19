import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import RestorePageIcon from '@material-ui/icons/RestorePage';

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import {Link} from "react-router-dom";

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  

  return (
      <div>
          <ListItem component={Link} to="/Anfitrion"
                    button 
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Propiedades" />
          </ListItem>


          <ListItem component={Link} to="/Anfitrion/Supervisores"
                    button 
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Supervisores" />


          </ListItem>
          <ListItem component={Link} to="/Anfitrion/Historial"
                    button 
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemIcon>
              <RestorePageIcon />
            </ListItemIcon>
            <ListItemText primary="Historial" />
          </ListItem>


          <ListItem component={Link} to="/Anfitrion/Folios"
                    button
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}  
                    >
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary="Folios" />
          </ListItem>

          
          
      </div>  
    
  );
}


