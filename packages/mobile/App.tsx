import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import {addToDo, getAllToDo, updateToDo, deleteToDo} from 'shared';
import ToDo from './components/Todo';

const App: React.FC = () => {
  // State variables to manage ToDo items and their properties
  const [toDo, setToDo] = useState<Array<{_id: string; text: string}>>([]);
  const [text, setText] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [toDoId, setToDoId] = useState<string>('');

  // Fetch all ToDo items from the server on component mount
  useEffect(() => {
    getAllToDo(setToDo, Platform.OS);
  }, []);

  // Function to enter update mode for a specific ToDo item
  const updateMode = (_id: string, text: string) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  // Function to handle adding or updating ToDo item
  const handleAddOrUpdateToDo = () => {
    if (isUpdating) {
      // If in update mode, call updateToDo function
      updateToDo(toDoId, text, setToDo, setText, setIsUpdating, Platform.OS);
    } else {
      // If not in update mode, call addToDo function
      addToDo(text, setText, setToDo, Platform.OS);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1,paddingHorizontal:12}}>
        <Text style={styles.title}>ToDo App</Text>

        <View style={styles.top}>
          {/* Input field to add new ToDo items */}
          <TextInput
            style={styles.input}
            placeholder="Add ToDos..."
            value={text}
            onChangeText={value => setText(value)}
          />

          {/* Add or Update button based on the current mode */}
          <TouchableOpacity style={styles.add} onPress={handleAddOrUpdateToDo}>
            <Text style={{color: '#FFF'}}>{isUpdating ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList to render the list of ToDo items */}
        <FlatList
          style={styles.list}
          data={toDo}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <ToDo
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo, Platform.OS)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  add: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  list: {
    flex: 1,
  },
});

export default App;
