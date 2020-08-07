// Import Mongoose
const mongoose = require("mongoose");

// Create a User Schema
const contactSchema = mongoose.Schema({
  // Add all the attributes
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String},
  type: {type: String, default: "personal"},
  date: {type: Date, default: Date.now()}
});

// Export the Schema as a model
module.exports = mongoose.model("contact", contactSchema);