// Importing React, the useRef Hook and the useContext Hook
import React, {useContext, useRef, useEffect} from 'react'

// Importing the Context
import ContactContext from "../../Context/Contact/ContactContext";

const ContactFilter = () => {
  // Initialize Context
  const contactContext = useContext(ContactContext);

  // Destructuring Context
  const {filterContacts, clearFilter, filtered} = contactContext;

  // Initalize Ref Value
  const text = useRef("");

  // Simulating ComponentDidMount (When the component renders)
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  })

  // When the Input Changes
  const onChange = e => {
    if (text.current.value !== "") {
      // Filter with the text (e.target.value) as an argument
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  }

  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
    </form>
  )
}

export default ContactFilter
