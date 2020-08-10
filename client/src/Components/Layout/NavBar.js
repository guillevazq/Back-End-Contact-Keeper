// Importing React and the useContext Hook
import React, {Fragment, useContext} from 'react';

// Get the Auth Context
import AuthContext from "../../Context/Auth/AuthContext";

// Get the Contact Context
import ContactContext from "../../Context/Contact/ContactContext";

// Importing PropTypes (To verify props have the form we want)
import PropTypes from "prop-types";

// Importing Links (For the navigation bar items)
import {Link} from "react-router-dom";

const NavBar = ({title, icon}) => {

  // Initialize Context (AUTH)
  const authContext = useContext(AuthContext);

  // Initialize Context (CONTACTS)
  const contactContext = useContext(ContactContext);

  // Destructure variables (Auth)
  const {isAuthenticated, logOut, user} = authContext;

  // Destructure variables (Contacts)
  const {clearContacts} = contactContext;

  // When the user clicks the logout button
  const onLogout = () => {
    logOut();
    clearContacts();
  }

  // When user is logged in
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas-fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  )
  
  // When user is not logged in
  const guessLinks = (
    <Fragment>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </Fragment>
  )

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guessLinks}
      </ul>
    </div>
  )
}

// Defining PropTypes
NavBar.propTypes = {

  // Title has to be a string and is required
  title: PropTypes.string.isRequired,

  // Icon has to be a string but is not required
  icon: PropTypes.string,
}

NavBar.defaultProps = {
  // Default title
  title: "Contact Keeper",
  // Default Icon
  icon: "fas fa-id-card-alt"
}

export default NavBar
