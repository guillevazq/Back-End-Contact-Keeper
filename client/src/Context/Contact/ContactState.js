// Importing React and the useReducer Hook
import React, {useReducer} from "react";

// Importing the HTTP Client (Axios)
import axios from "axios";

// Importing the Contact Context
import ContactContext from "./ContactContext";

// Importing the Contact Reducer
import contactReducer from "./ContactReducer";

// Importing Types
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS} from "../Types";

const ContactState = props => {
  // Creating the inital state 
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  // Initalizing the useReducer Hook
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try {
      // Do the actual Request
      const response = await axios.get("/api/contacts");      
      
      // We don't pass the token in the header because it's set globally whenever it's in local storege
      dispatch({type: GET_CONTACTS, payload: response.data}); 

    } catch (error) {
      dispatch({type: CONTACT_ERROR, payload: "Error"});
    }
  }

  // Add Contact
  const addContact = async contact => {
    // Create headers for axios request
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      // Do the actual Request
      const response = await axios.post("/api/contacts", contact, config)      
      
      // We don't pass the token in the header because it's set globally whenever it's in local storege
      dispatch({type: ADD_CONTACT, payload: response.data}); 

    } catch (error) {
      dispatch({type: CONTACT_ERROR, payload: "Error"});
    }
  }

  // Delete Contact
  const deleteContact = async id => {
    try {
      // Do the actual Request
      axios.delete(`/api/contacts/${id}`)      
      
      // We don't pass the token in the header because it's set globally whenever it's in local storege
      dispatch({type: DELETE_CONTACT, payload: id});

    } catch (error) {
      dispatch({type: CONTACT_ERROR, payload: "Error"});
    }
  }

  // Clear Contacts
  const clearContacts = () => {
    dispatch({type: CLEAR_CONTACTS});
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact});
  }
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT});
  }
  // Update Contact
  const updateContact = async contact => {
    // Create headers for axios request
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      // Do the actual Request
      const response = await axios.put(`/api/contacts/${contact._id}`, contact, config)      
      
      // We don't pass the token in the header because it's set globally whenever it's in local storege
      dispatch({type: UPDATE_CONTACT, payload: response.data});

    } catch (error) {
      dispatch({type: CONTACT_ERROR, payload: "Error"});
    }
  }
  // Filter Contact
  const filterContacts = text => {
    dispatch({type: FILTER_CONTACTS, payload: text});
  }
  // Clear Filter
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTER});
  }

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter,
      getContacts,
      clearContacts
    }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;