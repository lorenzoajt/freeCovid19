import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import { Link, useLocation} from "react-router-dom";

export default function SelectedListItem() {  
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  

  return (
      <div>                  
          <ListItem component={Link} to="/Admin"
                    button 
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Anfitriones" />
          </ListItem>
          <ListItem component={Link} to="/Admin/folios"
                    button 
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Folios" />
          </ListItem>

          
          
      </div>  
    
  );
}


