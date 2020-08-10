// Importing React, the useState and the useContext Hook
import React, {useState, useContext, useEffect} from 'react'

// Getting the Context
import ContactContext from "../../Context/Contact/ContactContext";

const ContactForm = () => {
  // Initializing the Context
  const contactContext = useContext(ContactContext);

  // Destructuring the Context
  const {addContact, updateContact, clearCurrent, current} = contactContext;

  // Use Effect Hook (Similar to ComponentDidMount)
  useEffect(() => {
    if (current != null) {
      // Set the Contact Info in the input fields
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      })
    }
  }, [contactContext, current]);

  // Create the State
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  // Destructure the different attributes from the state
  const {name, email, type} = contact;

  // When the User Types anything
  const onChange = e => setContact({...contact, [e.target.name]: e.target.value})

  // When the form is submitted
  const onSubmit = e => {
    e.preventDefault();

    // If it's editing or adding a new contact
    if (current === null) {
      // Add Contact
      addContact(contact);
    } else {
      // Edit Contact
      updateContact(contact);
    }

    // Clear Form
    clearCurrent();
  }

  const clearAll = () => clearCurrent();

  return (
    <form onSubmit={onSubmit}>
      {/* If current has a value, then change the title to Edit Contact */}
      <h2 className="text-primary">{current ? "Edit Contact" : "Add Contact"}</h2>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
      <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
      <h5>Contact Type</h5>
      <input onChange={onChange} type="radio" name="type" value="personal" checked={type === "personal"} 
      /> Personal {" "}
      <input onChange={onChange} type="radio" name="type" value="professional" checked={type === "professional"} />Professional
      <div>
        <input type="submit" value={current ? "Update Contact" : "Add Contact"}
         className="btn btn-primary btn-block" />
      </div>
      {current && 
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
        </div>}
    </form>
  )
}

export default ContactForm
