import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="desinfectapp.auth0.com"
    clientId="Ghu2ZcC8PolabT6DJFKck5p3947Enr87"
    audience="https://desinfectapp.auth0.com/api/v2/"
    redirectUri={window.location.origin}
    
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);




