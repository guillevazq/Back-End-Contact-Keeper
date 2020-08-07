// Importing Express
const express = require("express");

// Importing Auth Middleware (To protect routes)
const auth = require("../middleware/auth");

// Import the User Mongoose Model
const User = require("../models/User");

// Import the Contact Mongoose Model
const Contact = require("../models/Contact");

// Importing Express Validator (To verify request as we like)
const { check, validationResult } = require('express-validator');

// Initializing Router
const router = express.Router();

// Get All User Contacts (PRIVATE)
router.get("/", auth, async (request, response) => {
  try {
    // Storing all the contacts of a specific user
    const contacts = await Contact.find({user: request.user.id}).sort({date: -1})
    // Return Contacts
    response.json(contacts);
  } catch (err) {
    // If there's an error
    console.error(err.message);
    response.status(500).send("Server Error");
  }
});

// Add new contacts (PRIVATE)
router.post("/", [auth, [
  // Checking if name isn't empty
  check("name", "Name is required").not().isEmpty()
]] ,async (request, response) => {
  // Storing errors in variable
  const errors = validationResult(request);

  // Checking if the errors variable is empty
  if (!errors.isEmpty()) {
    // If it isn't, then return a json array with all the errors
    return response.status(400).json({errors: errors.array()})
  }

  // Getting values from request
  const {name, email, phone, type} = request.body;

  try {
    // Create new Contact with the data given in the request
    const newContact = new Contact({name, email, phone, type, user: request.user.id});

    // Saving Contact
    const contact = await newContact.save();

    // Returning the contact
    response.json(contact);
  } catch (error) {
    // If there's an error
    response.status(500).send("Server Error");
  }
});

// Update Contacts (PRIVATE)
router.put("/:id", auth, async (request, response) => {
  // Getting values from request
  const {name, email, phone, type} = request.body;

  // Build Contact Object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
    // Getting the contact with the id in the URL
    let contact = await Contact.findById(request.params.id);

    // If there's not a contact with that id
    if (!contact) return response.status(404).json({message: "Contact not found"});

    // Make user owns contact
    if (contact.user.toString() !== request.user.id) {
      // Return error
      return response.status(401).json({message: "Not authorised"});
    }
    // Update Contact by setting its fields to contact fields
    contact = await Contact.findByIdAndUpdate(request.params.id, {$set: contactFields}, 
      {new: true});
      // Return the edited contact
      response.json(contact);
  } catch (error) {
    // Display error
    console.error(error.message);
    response.status(500).send("Server error");
  }
});

// Delete Contacts (PRIVATE)
router.delete("/:id", auth, async (request, response) => {
  try {
    // Getting the contact with the id in the URL
    let contact = await Contact.findById(request.params.id);

    // If there's not a contact with that id
    if (!contact) return response.status(404).json({message: "Contact not found"});

    // Make user owns contact
    if (contact.user.toString() !== request.user.id) {
      // Return error
      return response.status(401).json({message: "Not authorised"});
    }
    // Delete contact if found
    await Contact.findByIdAndRemove(request.params.id);

    // Return a message
    response.json({message: "Contact removed"});
  } catch (error) {
    // Display error
    console.error(error.message);
    response.status(500).send("Server error");
  }
});

// Exporting Router
module.exports = router;