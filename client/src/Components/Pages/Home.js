// Importing React
import React, {useContext, useEffect} from 'react';

// Importing the Contacts Component
import Contacts from "../Contacts/Contacts";

// Importing the Contact Form
import ContactForm from "../Contacts/ContactForm";

// Importing the Contact Filter
import ContactFilter from "../Contacts/ContactFilter";

// Get the AuthContext
import AuthContext from "../../Context/Auth/AuthContext";

const Home = () => {

  // Initialize Context
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home;