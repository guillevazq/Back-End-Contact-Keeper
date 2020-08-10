// Importing React and the useReducer Hook
import React, {useReducer} from "react";

// Importing the Contact Context
import AuthContext from "./AuthContext";

// Importing the Contact Reducer
import authReducer from "./AuthReducer";

// Importing the setAuthToken function
import setAuthToken from "../../Utils/SetAuthToken";

// Importing the HTTP Client (Axios)
import axios from "axios";

// Importing Types
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, 
LOGOUT,
CLEAR_ERRORS} from "../Types";

const AuthState = props => {

  // Creating the inital state 
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,
  };

  // Initalizing the useReducer Hook
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register User
  const register = async formData => {
    // Settings for the post request
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      // Making the post request
      const response = await axios.post("/api/users", formData, config);

      // Returning the JSON Web Token
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      })

    } catch (error) {
      // If there's an error
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message
      });

      // Load user
      loadUser();
    }
  }

  // Load User
  const loadUser = async () => {
    // Set the token in the header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // To verify the token (It returns the user data)
      const res = await axios.get("/api/auth");

      dispatch({type: USER_LOADED, payload: res.data});

    } catch (error) {
      // If there's an error
      dispatch({type: AUTH_ERROR});
    }
  }

  // Login User
  const login = async formData => {
    // Settings for the post request
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      // Making the post request
      const response = await axios.post("/api/auth", formData, config);

      // Returning the JSON Web Token
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      })

      // Load user
      loadUser();

    } catch (error) {
      // If there's an error
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message
      });
    }
  }

  // Logout User
  const logOut = () => dispatch({type: LOGOUT});

  // Logout User
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS});

  return (
    <AuthContext.Provider value={{
      token: state.token,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      error: state.error,
      register,
      loadUser,
      login,
      logOut,
      clearErrors
    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthState;