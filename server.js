// Importing Express
const express = require("express");

// Importing Function that connects to Database
const connectDB = require("./config/db");

// Initializing an Express Application
const app = express();

// Connect Database
connectDB();

// Initialize Middleware (Allow App to access the json body of a request)
app.use(express.json({ extended: false }));

// Creating a response for "/"
app.get("/", (request, response) => response.json({ message: "Welcome to the Contact Keeper API" }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"))
app.use("/api/contacts", require("./routes/contacts"))

// Defining a port
const PORT = process.env.PORT || 5000;

// Initializing Server with Port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

