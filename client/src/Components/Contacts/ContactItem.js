// Importing React and the useContext hook
import React, {useContext} from 'react'

// Get PropTypes
import PropTypes from 'prop-types'

// Importing the Context
import ContactContext from "../../Context/Contact/ContactContext";

const ContactItem = ({ contact }) => {
  // Initializing the Context
  const contactContext = useContext(ContactContext);

  // Destructuring to get the deleteContact function
  const {deleteContact, setCurrent, clearCurrent} = contactContext

  // Destructure Props (Contact)
  const {_id, name, email, phone, type} = contact;

  // On Delete Function
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name} {" "} 
        <span style={{float: "right"}} className={"badge " + 
        // If it's professional or personal then add one badge or another
          (type === "professional" ? "badge-success" : "badge-primary")}>
            {/* Turning the first letter into upper case  */}
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button onClick={() => setCurrent(contact)} className="btn btn-dark btn-sm">Edit</button>
        <button onClick={onDelete} className="btn btn-danger btn-sm">Delete</button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem;