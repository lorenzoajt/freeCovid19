import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from 'jwt-decode'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  
} from "react-router-dom";
import Admin from '../views/Admin/'
import Anfitrion from '../views/Anfitrion/'
import Inspector from '../views/Inspector/'

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userType, setUserType] = useState("")


  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();      
        var decoded = jwt_decode(token);      
        setUserType(decoded["http://desinfectapp.com/role"])        
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  
    

  return(

    <Router>      
        {userType === "Admin" && <> <Redirect to= "/Admin" /></>}
        {userType === "Anfitrion" && <Redirect to= "/Anfitrion" /> }
        {userType === "Inspector" && <Redirect to="/Inspector" /> }

        <Switch>
          <Route path="/Admin">
            <Admin />
          </Route>
          <Route path="/Anfitrion">
            <Anfitrion />
          </Route>
          <Route path="/Inspector">
            <Inspector />
          </Route>
        </Switch>
    </Router>
  )
  
  


  
};

export default Profile;