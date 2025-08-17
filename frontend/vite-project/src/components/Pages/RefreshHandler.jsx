import React,{useEffect} from 'react'
import { use } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

export const RefreshHandler = ({setIsAuthenticated}) => {

  const location = useLocation();
  const navigate = useNavigate();
  
 useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsAuthenticated(true)
      if(location.pathname==="/" || location.pathname==="/login" || location.pathname=== "/signup" || location.pathname=== "/home"){
        navigate('/dashboard',{replace:false})
      }
    }
 },[location,navigate,setIsAuthenticated])



  return null; // This component is intentionally left blank to handle refreshes
}
