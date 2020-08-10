// Importing React
import React, {Fragment} from 'react';

// Importing React Router
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Importing the CSS
import './App.css'; 

// Importing the Contact State
import ContactState from "./Context/Contact/ContactState";

// Importing the Auth State
import AuthState from "./Context/Auth/AuthState";

// Importing the setAuthToken function
import setAuthToken from "./Utils/SetAuthToken";

// Importing the Alert State
import AlertState from "./Context/Alert/AlertState";

// Navigation Bar
import NavBar from "./Components/Layout/NavBar";

// Home Page
import Home from "./Components/Pages/Home";

// About Page
import About from "./Components/Pages/About";

// Register Page
import Register from "./Components/Auth/Register";

// Login Page
import Login from "./Components/Auth/Login";

// Alerts
import Alerts from "./Components/Layout/Alerts";

// Private Route
import PrivateRoute from "./Components/Routing/PrivateRoute";

// Set the token in the header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {
  return (
    <AlertState>
      <AuthState>
      {/* Everything inside the ContactState Tag to provide information from the context */}
        <ContactState>
        {/* Everything inside the Router Tag for it to work */}
          <Router>
            <Fragment>
              <NavBar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home}/>
                  <Route exact path="/about" component={About}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
}

export default App;
