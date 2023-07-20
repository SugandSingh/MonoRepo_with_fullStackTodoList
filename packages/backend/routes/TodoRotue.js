const { Router } = require('express'); // Import the Router from Express
const {
  getToDo,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require('../controllers/TodoControllers'); // Import the controller functions for handling Todo operations

const router = Router(); // Create an instance of the Express Router

// Define routes and their corresponding controller functions
router.get('', getToDo); // Route to handle GET request for fetching all Todo items
router.post('/save', saveToDo); // Route to handle POST request for saving a new Todo item
router.post('/update', updateToDo); // Route to handle POST request for updating a Todo item
router.post('/delete', deleteToDo); // Route to handle POST request for deleting a Todo item

module.exports = router; // Export the router to be used in the main Express application
