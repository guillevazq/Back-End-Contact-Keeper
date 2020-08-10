// Importing React and the useContext Hook
import React, {useContext, Fragment, useEffect} from 'react';

// Importing the Contacts Context
import ContactContext from "../../Context/Contact/ContactContext";

// Importing the Contact Item to display every single Contact
import ContactItem from "../Contacts/ContactItem";

// Importing CSS (Transitions)
import {CSSTransition, TransitionGroup} from "react-transition-group";

// Getting the Spinner
import Spinner from "../Layout/Spinner";

const Contacts = () => {
  // Initializing the Context
  const contactContext = useContext(ContactContext);

  // Getting the Contacts from the Contexts
  const {contacts, filtered, getContacts, loading} = contactContext;

  // Call the getContacts when the component loads
  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a Contact</h4>
  }

  return (
    <Fragment>
      {/* Load Spinner if:  */}
      {contacts !== null && !loading ? (
        <TransitionGroup>
        {filtered !== null ? filtered.map(contact => 
          (<CSSTransition key={contact._id} timeout={500} classNames="item">
            <ContactItem contact={contact} />
          </CSSTransition>)) 
          :
          contacts.map(contact =>
          (<CSSTransition key={contact._id} timeout={500} classNames="item"> 
            <ContactItem contact={contact} />
          </CSSTransition>))}
        </TransitionGroup>
      ) : <Spinner />}
    </Fragment>
  )
}

export default Contacts;
