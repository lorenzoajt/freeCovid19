import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="desinfectapp-prod.us.auth0.com"
    clientId="EAoNy02pVg5S69ed9OPO4mCarxkb1l4l"
    redirectUri={window.location.origin}
    audience="https://desinfectapp-prod.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);




