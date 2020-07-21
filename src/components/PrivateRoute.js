import React from 'react'
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuth0();
  console.log("isAuthenticated", isAuthenticated)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}