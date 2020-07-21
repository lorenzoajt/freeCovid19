import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Loader from './../../../components/Loader'


function PropiedadesRegistradas(){
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false)//cambiar a true
    
  




  
 
  if(loading){
    return <Loader />
  }else{
    return(
      <div>
        Historial
      </div>
    )

  }
  
  
}

export default PropiedadesRegistradas