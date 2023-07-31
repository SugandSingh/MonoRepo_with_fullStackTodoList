import axios, { AxiosResponse } from "axios";

// Set the base URL for the API
// Use 'localhost' for development on the Android emulator
// Change this to the appropriate URL when deploying the app
const baseUrl: Record<string, string> = {
  android: "http://10.0.2.2:1997",
  ios: "http://localhost:1997",
};

// Function to get all ToDo items from the server
const getAllToDo = async (
  setToDo: React.Dispatch<React.SetStateAction<any[]>>,
  platform: string
): Promise<void> => {
  try {
    const response = await axios.get(baseUrl[platform]);
    const data = response.data;
    console.log("Received data:", data);
    setToDo(data);
  } catch (err) {
    console.error("Error fetching Todo items:", err);
    setToDo([]); // If an error occurs, set an empty array for Todo items
  }
};

// Function to add a new ToDo item to the server
const addToDo = async (
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setToDo: React.Dispatch<React.SetStateAction<any[]>>,
  platform: string
): Promise<void> => {
  try {
    await axios.post(`${baseUrl[platform]}/save`, { text });
    console.log("Successfully added Todo item.");
    setText(""); // Clear the input text after adding the Todo item
    await getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
  } catch (err) {
    console.error("Error adding Todo item:", err);
  }
};

// Function to update a ToDo item on the server
const updateToDo = async (
  toDoId: string,
  text: string,
  setToDo: React.Dispatch<React.SetStateAction<any[]>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  platform: string
): Promise<void> => {
  try {
    await axios.post(`${baseUrl[platform]}/update`, { _id: toDoId, text });
    console.log("Successfully updated Todo item.");
    setText(""); // Clear the input text after updating the Todo item
    setIsUpdating(false); // Exit update mode
    await getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
  } catch (err) {
    console.error("Error updating Todo item:", err);
  }
};

// Function to delete a ToDo item from the server
const deleteToDo = async (
  _id: string,
  setToDo: React.Dispatch<React.SetStateAction<any[]>>,
  platform: string
): Promise<void> => {
  try {
    await axios.post(`${baseUrl[platform]}/delete`, { _id });
    console.log("Successfully deleted Todo item.");
    await getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
  } catch (err) {
    console.error("Error deleting Todo item:", err);
  }
};

const log = () => {
  console.log("This is a function from shared folder");
};

export { getAllToDo, addToDo, updateToDo, deleteToDo, log };
