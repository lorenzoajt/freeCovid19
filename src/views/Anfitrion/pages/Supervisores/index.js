import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";

import TablePerPage from "./TablePerPage";
import Loader from "../../../../components/Loader.js";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AgregarSupervisor from "./AgregarSupervisor";

import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  root: {
	margin: theme.spacing(1),
	'& .MuiTextField-root': {
		margin: theme.spacing(1),
		width: 200,
	  },
  },
  boton: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function Supervisores() {
  const [supervisores, setSupervisores] = useState({});
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  // TODO: Cambiar formato de fecha en tabla de supervisores- ya estufas
  //TODO:Agregar supervisor en la misma página que la tabla
  useEffect(() => {
    const getSupervisores = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          "https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/users/inspectors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();

        setSupervisores(responseData);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getSupervisores();
  }, []);

  const columns = [
    { title: "Nombre", field: "name" },
    { title: "E-mail", field: "email" },
    { title: "Fecha de creación", field: "created_at", type: "date" },
  ];

  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading2, setLoading2] = useState(false);


  const postToAPI = async () => {
    setLoading2(true);
    try {
      const token = await getAccessTokenSilently();
      const post = {
        email: email,
        name: name,
      };
      await fetch(
        "https://qxtbqbuj4m.execute-api.us-east-1.amazonaws.com/prod/users/inspectors",
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading2(false);
	  history.push("/Anfitrion/supervisores");
    } catch (error) {
      setLoading2(false);
      console.error(error);
    }
  };

  const check = () => {
    if (name !== "" && email.includes("@")) {
      return false;
    } else {
      return true;
    }
  };

  if (loading || loading2 ) {
    return <Loader />;
  } else {
    return (
      <div className={classes.root}>
        <div>
          <form className={classes.root} autoComplete="off">
            <TextField
              error={name === ""}
              label="Nombre"
              helperText="Este campo es obligatorio"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              error={email.includes("@") === false}
              label="E-mail"
              helperText="Este campo es obligatorio"
              onChange={(event) => setEmail(event.target.value)}
            />
          </form>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            value="Agregar"
            disabled={check() && true}
            onClick={postToAPI}
            className={classes.boton}
          >
            Confirmar
          </Button>
        </div>

        <TablePerPage
          data={supervisores}
          title={"Supervisores Registrados"}
          columns={columns}
        />
      </div>
    );
  }
}

export default Supervisores;
