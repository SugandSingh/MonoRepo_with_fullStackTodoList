"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.deleteToDo = exports.updateToDo = exports.addToDo = exports.getAllToDo = void 0;
const baseUrl = {
    android: "http://10.0.2.2:1997",
    ios: "http://localhost:1997",
};
const handleResponse = (response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!response.ok) {
        throw new Error("Network response was not ok.");
    }
    return response.json();
});
const getAllToDo = (setToDo, platform) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(baseUrl[platform]);
        const data = yield handleResponse(response);
        console.log("Received data:", data);
        setToDo(data);
    }
    catch (err) {
        console.error("Error fetching Todo items:", err);
        setToDo([]); // If an error occurs, set an empty array for Todo items
    }
});
exports.getAllToDo = getAllToDo;
const addToDo = (text, setText, setToDo, platform) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch(`${baseUrl[platform]}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });
        console.log("Successfully added Todo item.");
        setText(""); // Clear the input text after adding the Todo item
        yield getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
    }
    catch (err) {
        console.error("Error adding Todo item:", err);
    }
});
exports.addToDo = addToDo;
const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating, platform) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch(`${baseUrl[platform]}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: toDoId, text }),
        });
        console.log("Successfully updated Todo item.");
        setText(""); // Clear the input text after updating the Todo item
        setIsUpdating(false); // Exit update mode
        yield getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
    }
    catch (err) {
        console.error("Error updating Todo item:", err);
    }
});
exports.updateToDo = updateToDo;
const deleteToDo = (_id, setToDo, platform) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch(`${baseUrl[platform]}/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id }),
        });
        console.log("Successfully deleted Todo item.");
        yield getAllToDo(setToDo, platform); // Fetch all Todo items again to refresh the list
    }
    catch (err) {
        console.error("Error deleting Todo item:", err);
    }
});
exports.deleteToDo = deleteToDo;
const log = () => {
    console.log("This is a function from the shared folder");
};
exports.log = log;
//# sourceMappingURL=api.js.map