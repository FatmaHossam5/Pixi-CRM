import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './../Context/AuthContext';

export default function ProtectedRoute({children}) {
    
    const {userData} = useContext(AuthContext)
  if(userData == null && localStorage.getItem("userToken") == null)
  {

    return <Navigate to="/Login"/>
  }
  else{
    return children;
  }

}