// Importing Mongoose
const mongoose = require("mongoose");

// Importing Config (To get global variables from default.json)
const config = require("config");

// Getting URI of Database
const db = config.get("mongoURI");

// Defining the function that initalizes a connection with the database
const connectDB = async () => {
  try {
    // Second parameter avoids useless warnings
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;