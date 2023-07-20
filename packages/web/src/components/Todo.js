import React from 'react';

import { BiEdit } from 'react-icons/bi'; // Import the BiEdit icon from react-icons/bi
import { AiFillDelete } from 'react-icons/ai'; // Import the AiFillDelete icon from react-icons/ai

// The ToDo component takes three props: text, updateMode, and deleteToDo
const ToDo = ({ text, updateMode, deleteToDo }) => {
  return (
    <div className="todo">
      {/* Display the text of the Todo */}
      <div className="text">{text}</div>

      {/* Render the icons for editing and deleting the Todo */}
      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteToDo} />
      </div>
    </div>
  );
};

export default ToDo;
