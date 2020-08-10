// Importing React, the useState hook
import React, {useState, useContext, useEffect} from 'react'

// Import the Authorisation Context
import AuthContext from "../../Context/Auth/AuthContext";

// Import the Alert Context
import AlertContext from "../../Context/Alert/AlertContext";

const Login = props => {

  // Initialize the context (Authorisation)
  const authContext = useContext(AuthContext);

  // Initialize the context (Authorisation)
  const alertContext = useContext(AlertContext);
  
  // Destructure authorisation context
  const {login, error, clearErrors, isAuthenticated} = authContext
  
  // Destructure alert context
  const {setAlert} = alertContext

  // Set useEffect Hook
  useEffect(() => {

    // If the user is authenticated
    if (isAuthenticated) {
      // Then redirect to home page
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    } 
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // Setting the state
  const [user, setUser] = useState({email: "", password: ""});

  // Destructure variables
  const {email, password} = user; 

  // When the User Types
  const onChange = e => setUser({...user, [e.target.name]: e.target.value}); 

  // When the form is submitted
  const onSubmit = e => {
    e.preventDefault();
    
    // Form Validation
    // If fields are empty
    if (email === "" || password === "") {
      // Display Alert
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password
      });
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input required type="email" name="email" id="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input required type="password" name="password" id="password" value={password} 
          onChange={onChange} />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login;
