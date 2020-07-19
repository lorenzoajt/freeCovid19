import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',

  },
  Dengue: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
    backgroundColor: 'coral',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardNoActions(props) {
  const {servicio, numFolios}= props
  const classes = useStyles();

  return (
    <Card className={classes.bullet} >
    <CardContent>
      
      <Typography variant="h5" component="h2">
        {servicio}
      </Typography>        
      <Typography variant="h2" component="p">
        {numFolios}
      </Typography>
    </CardContent>   
  </Card>  
  );
}
