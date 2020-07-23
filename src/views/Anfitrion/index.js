import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SelectedListItem from './listItems';
import {Theme} from '../../components/Theme.js'
import { ThemeProvider } from '@material-ui/core/styles';

import Folios from './pages/Folios'
import Historial from './pages/Historial'
import PropiedadesRegistradas from './pages/Propiedades/PropiedadesRegistradas'
import Supervisores from './pages/Supervisores/'
import AgregarPropiedad from './pages/Propiedades/AgregarPropiedad'
import AreasRegistradas from './pages/Propiedades/AreasRegistradas'
import ElementosDeArea from './pages/Propiedades/ElementosDeArea'
import Logout from "../../components/Logout";
import AgregarArea from './pages/Propiedades/AgregarArea/'
import AgregarSupervisor from './pages/Supervisores/AgregarSupervisor'
import Detalle from '../../components/Detalle'
import DetalleUsed from '../../components/DetalleUsed'
import ItemsAreasRegistradas from './pages/Propiedades/AgregarArea/ItemsAreasRegistradas'
import AgregarItems from './pages/Propiedades/AgregarArea/AgregarItems'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function DashboardAnfitrion() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [areasTerminadas, setAreasTerminadas] = React.useState([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    console.log("clicked")
  }

  const handleAreasTerminadas = (area) => {
    setAreasTerminadas([...areasTerminadas, area])    
  }



  return (
    <ThemeProvider theme={Theme}>
    <div className={classes.root}>      
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Logout />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SelectedListItem />
       
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>

            <Route exact path ="/Anfitrion" component={PropiedadesRegistradas}/>
            <Route path = '/Anfitrion/AgregarPropiedad' component={AgregarPropiedad} />
            <Route path = "/Anfitrion/AreasRegistradas/:propertyId/:propertyName" component={AreasRegistradas}/>
            <Route path = "/Anfitrion/ItemsAreasRegistradas/:propertyId" render = {props => <ItemsAreasRegistradas {...props} areasTerminadas={areasTerminadas} /> } />            
            <Route path = "/Anfitrion/AgregarItems/:areaName/:areaType/:areaId/:propertyId" render = {props => <AgregarItems {...props} handleAreasTerminadas={handleAreasTerminadas} /> } />            
            <Route path = "/Anfitrion/ElementosDeArea/:areaId/:areaName" component = {ElementosDeArea} />
            
            <Route path = "/Anfitrion/AgregarArea/:propertyId" component = {AgregarArea} />
            <Route path = "/Anfitrion/Supervisores" component={Supervisores}/>
            <Route path = "/Anfitrion/historial" component={Historial}/>
            
            <Route path = "/Anfitrion/Folios" component={Folios}/>    
            <Route path = "/Anfitrion/areasRegistradas" component={AreasRegistradas}/>
            <Route path = "/Anfitrion/agregarSupervisor" component={AgregarSupervisor}/>
            <Route path = "/Anfitrion/detalle/:servicio/:hostId" component={Detalle} />
            <Route path = "/Anfitrion/detalleUsed/:servicio/:hostId" component={DetalleUsed} />
            <Route render={()=> <h3>Not found</h3>}/>

          </Switch>
      </main>
    </div>
    </ThemeProvider>
  );
}