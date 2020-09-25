import React from 'react';
import HomePage from './components/HomePage'
import Profile from './components/Profile'
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'
import './styles/main.scss'
function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      
      {isAuthenticated ? 
        (
            <Profile />
        )
        :
        <> 
          <HomePage />          
        </>
      }

      
    </div>
  );
}

export default App;
