import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  Dengue: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    backgroundColor: "coral",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const cardStyle = {
  borderRadius: "20%",
  border: "3px solid rgb(90,90,90)",
  width: "250px",
  height: "250px",
  boxShadow: "0px 4px 5px 0px grey"
}

export default function CardFolios(props) {
  const { numFolios, hostId } = props;
  let { servicio } = props;
  const classes = useStyles();

  if( servicio === "Desinfeccion"){
    servicio = "Desinfección";
  }

  return (
    <Card className={classes.bullet} style={ cardStyle }>
      <CardContent style={{ paddingBottom: "0" }}>
        <div className="cardContentDiv">
          <div className="cardIcon"></div>
          <div className="cardTypeText">
            <p>{ servicio } { numFolios }</p>
          </div>
        </div>
        {/* <Typography variant="h5" component="h2">
          {servicio}
        </Typography>
        <Typography variant="h2" component="p">
          {numFolios}
        </Typography> */}
      </CardContent>
      <CardActions>
        <div className="cardButtonDiv">
          <Button
            disabled={numFolios === 0 && true}
            size="small"
            component={Link}
            to={`/Anfitrion/detalle/${servicio}/${hostId}`}
          >
            Ver Detalle
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
