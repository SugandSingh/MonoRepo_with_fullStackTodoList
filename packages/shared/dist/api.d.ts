declare const getAllToDo: (setToDo: React.Dispatch<React.SetStateAction<any[]>>, platform: string) => Promise<void>;
declare const addToDo: (text: string, setText: React.Dispatch<React.SetStateAction<string>>, setToDo: React.Dispatch<React.SetStateAction<any[]>>, platform: string) => Promise<void>;
declare const updateToDo: (toDoId: string, text: string, setToDo: React.Dispatch<React.SetStateAction<any[]>>, setText: React.Dispatch<React.SetStateAction<string>>, setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>, platform: string) => Promise<void>;
declare const deleteToDo: (_id: string, setToDo: React.Dispatch<React.SetStateAction<any[]>>, platform: string) => Promise<void>;
declare const log: () => void;
export { getAllToDo, addToDo, updateToDo, deleteToDo, log };
