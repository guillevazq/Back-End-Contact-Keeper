// The NORM FOR PRIVATE ROUTING IN REACT

// Importing React and the UseContext Hook
import React, {useContext} from 'react'

// Importing the React Router
import {Route, Redirect} from "react-router-dom";

// Import Authentication Context
import AuthContext from "../../Context/Auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Initializing Context
  const authContext = useContext(AuthContext);

  // Destructure variables from context
  const {isAuthenticated, loading} = authContext;

  return (
    <Route {...rest} render={props => !isAuthenticated && !loading ? 
      (<Redirect to="/login" />) 
    : 
      (<Component {...props} />) 
    } />
  )
}

export default PrivateRoute
