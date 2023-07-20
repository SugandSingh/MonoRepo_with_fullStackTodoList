// Import the TodoModel, assuming it is a Mongoose model representing the Todo schema
const todoModel = require("../models/TodoModel");

// Function to save a new Todo item
module.exports.saveToDo = (req, res) => {
  const { text } = req.body; // Extract the 'text' property from the request body

  // Create a new document in the database with the given 'text' using 'todoModel.create()'
  todoModel
    .create({ text })
    .then((data) => {
      res.status(201).json({ msg: "Added Successfully...", data: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add Todo item." });
    });
};

// Function to retrieve all Todo items
module.exports.getToDo = async (req, res) => {
  try {
    // Fetch all Todo items from the database using 'todoModel.find()'
    const todo = await todoModel.find();
    res.status(200).json(todo); // Respond with the array of Todo items
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Todo items." });
  }
};

// Function to delete a Todo item by its _id
module.exports.deleteToDo = (req, res) => {
  const { _id } = req.body; // Extract the '_id' property from the request body

  // Find and delete the Todo item with the given '_id' using 'todoModel.findByIdAndDelete()'
  todoModel
    .findByIdAndDelete(_id)
    .then(() => res.status(201).json({ msg: "Deleted Successfully..." }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete Todo item." });
    });
};

// Function to update a Todo item by its _id
module.exports.updateToDo = (req, res) => {
  const { _id, text } = req.body; // Extract the '_id' and 'text' properties from the request body

  // Find the Todo item with the given '_id' and update its 'text' property using 'todoModel.findByIdAndUpdate()'
  todoModel
    .findByIdAndUpdate(_id, { text })
    .then(() => res.status(201).json({ msg: "Updated Successfully..." }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to update Todo item." });
    });
};
