import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from 'jwt-decode'
import {
  BrowserRouter as Router,
  Switch,  
  Redirect  
} from "react-router-dom";
import Admin from '../views/Admin/'
import Anfitrion from '../views/Anfitrion/'

import PrivateRoute from './PrivateRoute'
const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [userType, setUserType] = useState("")






  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();      
        var decoded = jwt_decode(token);      
        setUserType(decoded["http://desinfectapp.com/role"])        
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchData();
  }, []);
    

  return(

    <Router>      
        {userType === "Admin" && <Redirect to= "/Admin" />}
        {userType === "Anfitrion" && <Redirect to= "/Anfitrion" /> }   
        {userType === "Inspector" && <Redirect to="/Inspector" /> }

        <Switch>
          <PrivateRoute path="/Admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/Anfitrion">
            <Anfitrion />
          </PrivateRoute>          
        </Switch>
    </Router>
  )
  
  


  
};

export default Profile;