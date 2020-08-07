// Importing Express
const express = require("express");

// Importing Config (Global Variables)
const config = require("config");

// Getting Middleware
const auth = require("../middleware/auth");

// Importing Bcrypt
const bcrypt = require("bcryptjs");

// Importing JSON Web Tokens
const jwt = require("jsonwebtoken");

// Importing Express Validator (To verify request as we like)
const { check, validationResult } = require('express-validator');

// Import the User Mongoose Model
const User = require("../models/User");

// Initializing Router
const router = express.Router();

// Getting logged in User (PRIVATE)
router.get("/", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select("-password");
    response.json(user);
  } catch (err) {
    console.error(err.message);
    response.status(500).send("Server error"); 
  }
});

// Authorise User and Get Token (PUBLIC)
router.post("/", [
  // Making sure the email is an email
  check("email", "Please include a valid email").isEmail(),
  // Making sure there is password
  check("password", "Password is required").exists()
], async (request, response) => {
  // Get errors if there are any and store them
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    // Return a JSON Array with the errors if there are any
    return response.status(400).json({errors: errors.array()});
  }

  const {email, password} = request.body;

  try {
    // Checking if a user with that email exists
    let user = await User.findOne({email});

    if (!user) {
      // If there's no user with such email
      return response.status(400).json({message: "Invalid credentials"});
    }

    // Checking if passwords match (This method is always done with a plain text and a hashed one)
    const isMatch = await bcrypt.compare(password, user.password)

    // If they don't match
    if (!isMatch) {
      // Then display an error through json
      return response.status(400).json({message: "Invalid Credentials"});
    }

    // Getting the users id
    const payload = {
      user: {
        id: user.id
      }
    }

    // Getting a json web token
    jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 3600000}, (err, token) => {
      if (err) throw err;
      response.json({token});
    }
  );
  } catch (err) {
    console.error(err.message);
    response.status(500).send("Server Error");
  }
});
 
// Exporting Router
module.exports = router;