// Importing React, the useState hook, the useContext hook and the useEffect Hook
import React, {useState, useContext, useEffect} from 'react'

// Get Alerts
import AlertContext from "../../Context/Alert/AlertContext";

// Get Register Function
import AuthContext from "../../Context/Auth/AuthContext";

const Register = props => {

  // Initialize Context (Authorisation)
  const authContext = useContext(AuthContext);

  // Destructure Variables
  const {register, error, clearErrors, isAuthenticated} = authContext;

  // Set useEffect Hook
  useEffect(() => {

    // If the user is authenticated
    if (isAuthenticated) {
      // Then redirect to home page
      props.history.push("/");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // Initialize Context (Alerts)
  const alertContext = useContext(AlertContext);

  // Destructure Variables
  const {setAlert} = alertContext;

  // Setting the state
  const [user, setUser] = useState({name: "", email: "", password: "", password2: ""});

  // Destructure variables
  const {name, email, password, password2} = user; 

  // When the User Types
  const onChange = e => setUser({...user, [e.target.name]: e.target.value}); 

  // When the form is submitted
  const onSubmit = e => {
    e.preventDefault();

    // Validation of the form
    if (name === "" || email === "" || password === "") {
      // Display Alert
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords don't match", "danger");
    } else {
      // If the form is valid
      register({name, email, password});
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input required type="text" name="name" id="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input required type="email" name="email" id="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input minLength="6" required type="password" name="password" id="password" value={password} 
          onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input minLength="6" required type="password" name="password2" id="password2" value={password2}
           onChange={onChange} />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Register
