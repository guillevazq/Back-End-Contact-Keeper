// Import Mongoose
const mongoose = require("mongoose");

// Create a User Schema
const userSchema = mongoose.Schema({
  // Add all the attributes
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  date: {type: Date, default: Date.now()}
});

// Export the Schema as a model
module.exports = mongoose.model("user", userSchema);