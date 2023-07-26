import axios from 'axios';

// Set the base URL for the API
// Use 'localhost' for development on the Android emulator
// Change this to the appropriate URL when deploying the app
const baseUrl =  { android:"http://10.0.2.2:1997",ios:'http://localhost:1997' }

// Function to get all ToDo items from the server
const getAllToDo = (setToDo,platform) => {
  axios
    .get(baseUrl[platform])
    .then(({ data }) => {
      console.log('Received data:', data);
      setToDo(data);
    })
    .catch((err) => {
      console.error('Error fetching Todo items:', err);
      setToDo([]); // If an error occurs, set an empty array for Todo items
    });
};

/// Function to add a new ToDo item to the server
const addToDo = (text, setText, setToDo,platform) => {
    axios
      .post(`${baseUrl[platform]}/save`, { text })
      .then(() => {
        console.log('Successfully added Todo item.');
        setText(""); // Clear the input text after adding the Todo item
        getAllToDo(setToDo,platform); // Fetch all Todo items again to refresh the list
      })
      .catch((err) => console.error('Error adding Todo item:', err));
  };
  
  // Function to update a ToDo item on the server
  const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating,platform) => {
    axios
      .post(`${baseUrl[platform]}/update`, { _id: toDoId, text })
      .then(() => {
        console.log('Successfully updated Todo item.');
        setText(""); // Clear the input text after updating the Todo item
        setIsUpdating(false); // Exit update mode
        getAllToDo(setToDo,platform); // Fetch all Todo items again to refresh the list
      })
      .catch((err) => console.error('Error updating Todo item:', err));
  };
  
  // Function to delete a ToDo item from the server
  const deleteToDo = (_id, setToDo,platform) => {
    axios
      .post(`${baseUrl[platform]}/delete`, { _id })
      .then(() => {
        console.log('Successfully deleted Todo item.');
        getAllToDo(setToDo,platform); // Fetch all Todo items again to refresh the list
      })
      .catch((err) => console.error('Error deleting Todo item:', err));
  };
  
  export { getAllToDo, addToDo, updateToDo, deleteToDo };
