import { useEffect, useState } from "react";
import ToDo from "./components/Todo";
import { addToDo, getAllToDo, updateToDo, deleteToDo ,log} from "shared";

function App() {
  // State variables to manage Todo items and their properties
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  // Fetch all Todo items from the server on component mount
  useEffect(() => {
    getAllToDo(setToDo,'ios');
    log()
  }, []);

  // Function to enter update mode for a specific Todo item
  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          {/* Input field to add new Todo items */}
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Add or Update button based on the current mode */}
          <div
            className="add"
            onClick={
              isUpdating
                ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating,'ios')
                : () => addToDo(text, setText, setToDo,'ios')
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {/* Map through the Todo items and render the ToDo component for each */}
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo,'ios')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
