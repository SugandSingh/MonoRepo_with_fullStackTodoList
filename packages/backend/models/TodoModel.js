const mongoose = require("mongoose"); // Import the Mongoose library

// Define the Todo schema using mongoose.Schema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Define a field 'text' of type 'String' which is required
});

// Create a Mongoose model named 'todolists' based on the defined schema
// The model represents a collection named 'todolists' in the MongoDB database
module.exports = mongoose.model('todolists', todoSchema);
