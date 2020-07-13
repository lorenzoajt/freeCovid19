import React from 'react';
import Login from './components/Login'
import Logout from './components/Logout'
import Profile from './components/Profile'
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  return (
    <div className="App">
      
      {isAuthenticated ? 
        (
            <Profile />
        )
        :
        <> 
          <h1>HomePage</h1>
          <Login />
        </>
      }

      
    </div>
  );
}

export default App;
