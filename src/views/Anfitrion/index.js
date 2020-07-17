import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SelectedListItem from './listItems';
import {Theme} from '../../components/Theme.js'
import { ThemeProvider } from '@material-ui/core/styles';

import Desinfeccion from './pages/Desinfeccion'
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
import Detalle from '../../components/Detalle.js'
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (

    <Router >
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

            <Route path="/Anfitrion" component={PropiedadesRegistradas}/>
            <Route exact path='/AgregarPropiedad' component={AgregarPropiedad} />
            <Route exact path= "/AreasRegistradas/:propertyId" component={AreasRegistradas}/>
            <Route exact path= "/ItemsAreasRegistradas/:propertyId" component={ItemsAreasRegistradas}/>            
            <Route exact path="/ElementosDeArea/:areaId" component = {ElementosDeArea} />
            <Route exact path="/AgregarItems/:areaType/:areaId/:propertyId" component = {AgregarItems} />
            <Route exact path="/AgregarArea/:propertyId" component = {AgregarArea} />

            <Route exact path="/Supervisores" component={Supervisores}/>
            <Route exact path="/historial" component={Historial}/>
            <Route exact path="/Desinfeccion" component={Desinfeccion}/>
            <Route exact path="/Folios" component={Folios}/>    

            <Route exact path="/areasRegistradas" component={AreasRegistradas}/>
            <Route exact path= "/agregarSupervisor" component={AgregarSupervisor}/>
            <Route exact path="/detalle/:servicio/:hostId" component={Detalle} />
            <Route render={()=> <h3>Not found</h3>}/>

          </Switch>
      </main>
    </div>
    </ThemeProvider>
    </Router>
  );
}