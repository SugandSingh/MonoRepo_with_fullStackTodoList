import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface ToDoProps {
  text: string;
  updateMode: () => void;
  deleteToDo: () => void;
}

const ToDo: React.FC<ToDoProps> = ({text, updateMode, deleteToDo}) => {
  return (
    <View style={styles.todo}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={updateMode}>
          <Image
            resizeMode="contain"
            style={{width: 18, height: 18 ,marginHorizontal: 6,}}
            source={require('../Image/editImg.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteToDo}>
          <Image
            resizeMode="contain"
            style={{width: 20, height: 20}}
            source={require('../Image/deleteImg.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#000',
    borderRadius: 6,
  },
  text: {
    flex: 1,
    marginRight: 10,
    color: '#FFF',
    fontSize: 18,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 24,
    marginLeft: 10,
    color: 'black',
  },
});

export default ToDo;
