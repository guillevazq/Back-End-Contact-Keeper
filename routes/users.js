// Importing Express
const express = require("express");

// Importing Config (Global Variables)
const config = require("config");

// Importing Bcrypt
const bcrypt = require("bcryptjs");

// Importing JSON Web Tokens
const jwt = require("jsonwebtoken");

// Initializing Router
const router = express.Router();

// Importing Express Validator (To verify request as we like)
const { check, validationResult } = require('express-validator');

// Import the User Mongoose Model
const User = require("../models/User");

// Registering a new user (PUBLIC)
router.post("/", 
  // (2) Checking if the values are what we want
  [ 
  check("name", "Please add a name").not().isEmpty(), 
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with six or more characters").isLength({min: 6})],
  // (3) Returning error if there is one and returning data if there isn't
  async (request, response) => {
  // Getting the errors (if there were)
  const errors = validationResult(request);

  // Returning the error if the variable (errors) isn't empty
  if (!errors.isEmpty()) {
    return response.status(400).json({errors: errors.array()})
  }

  // Get Name, Email & Password from the request body
  const {name, email, password} = request.body;

  try {
    // Checking if there's a another user with the same email (Mongoose Function)
    let user = await User.findOne({ email });

    // If there is, then throw error
    if (user) {
      response.status(400).json({message: "User already exists"});
    }

    // If there isn't, then create a new user with the User Model
    user = new User({name, email, password});

    // Encrypt Password (With module bcrypt) (Number is the number of encryption rounds)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save User to the Database
    await user.save();

    // Getting the user ID
    const payload = {
      user: {
        id: user.id
      }
    }

    // Creating JSON Web Token
    // First Argument: Generate JSON Web Token
    //  (Unique Set of Characters, in this case the ID, common string)
    // Second argument, time it takes to expire (ms) as an object
    // Third Argument, CallBack - Getting the token
    jwt.sign(payload, config.get("jwtSecret"), {
      // 3600 in production (1 hour)
      expiresIn: 36000000
    }, (err, token) => { 
      // If there's an error then throw the error
      if (err) throw err;

      // Return the token
      response.json({token});
      }, 
    );
    // If there's an error, throw it
  } catch (err) {
    console.error(err.message);
    response.status(500).send("Server Error");
  }
});

// Exporting Router
module.exports = router;