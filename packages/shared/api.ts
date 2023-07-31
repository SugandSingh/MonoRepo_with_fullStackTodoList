const baseUrl: Record<string, string> = {
  android: "http://10.0.2.2:1997",
  ios: "http://localhost:1997",
};

interface ToDo {
  // Define the structure of your ToDo object here
  // For example: _id: string; text: string; createdAt: Date;
  // Modify this interface to match the actual ToDo structure from the server response.
}

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  return response.json();
};

const getAllToDo = async (
  setToDo: React.Dispatch<React.SetStateAction<ToDo[]>>,
  platform: string
): Promise<void> => {
  try {
    const response = await fetch(baseUrl[platform]);
    const data = await handleResponse(response);
    console.log("Received data:", data);
    setToDo(data);
  } catch (err) {
    console.error("Error fetching Todo items:", err);
    setToDo([]); // If an error occurs, set an empty array for Todo items
  }
};

const addToDo = async (
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setToDo: React.Dispatch<React.SetStateAction<ToDo[]>>,
  platform: string
): Promise<void> => {
  try {
    await fetch(`${baseUrl[platform]}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    console.log("Successfully added Todo item.");
    setText(""); // Clear the input text after adding the Todo item
    await getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
  } catch (err) {
    console.error("Error adding Todo item:", err);
  }
};

const updateToDo = async (
  toDoId: string,
  text: string,
  setToDo: React.Dispatch<React.SetStateAction<ToDo[]>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  platform: string
): Promise<void> => {
  try {
    await fetch(`${baseUrl[platform]}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: toDoId, text }),
    });
    console.log("Successfully updated Todo item.");
    setText(""); // Clear the input text after updating the Todo item
    setIsUpdating(false); // Exit update mode
    await getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
  } catch (err) {
    console.error("Error updating Todo item:", err);
  }
};

const deleteToDo = async (
  _id: string,
  setToDo: React.Dispatch<React.SetStateAction<ToDo[]>>,
  platform: string
): Promise<void> => {
  try {
    await fetch(`${baseUrl[platform]}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    console.log("Successfully deleted Todo item.");
    await getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
  } catch (err) {
    console.error("Error deleting Todo item:", err);
  }
};

const log = () => {
  console.log("This is a function from the shared folder");
};

export { getAllToDo, addToDo, updateToDo, deleteToDo, log };
