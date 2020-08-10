// Importing React and the useReducer Hook
import React, {useReducer} from "react";

// Importing UUDI (Random ID's)
import {v4 as uuidv4} from "uuid";

// Importing the Alert Context
import AlertContext from "./AlertContext";

// Importing the Alert Reducer
import alertReducer from "./AlertReducer";

// Importing Types
import {SET_ALERT, REMOVE_ALERT} from "../Types";

const AlertState = props => {

  // Creating the inital state 
  const initialState = [];

  // Initalizing the useReducer Hook
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    // Random ID
    const id = uuidv4();

    // Call a dispatch case
    dispatch({type: SET_ALERT, payload: {msg, type, id}});

    // Remove that alert in certain time
    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
  }

  return (
    <AlertContext.Provider value={{
      alerts: state,
      setAlert,
    }}>
      {props.children}
    </AlertContext.Provider>
  )
};

export default AlertState;