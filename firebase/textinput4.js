import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';

const App = () => {
  const [inputTextValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
 

  useEffect(() => {
    const getData = () => {
      try {
        database().ref('users').on('value', (snapshot) => {
          const data = snapshot.val();
          const parsedData = data ? Object.entries(data).map(([key, value]) => ({ key, ...value })) : [];
          setList(parsedData);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const addData = async () => {
    try {
      if (inputTextValue.length > 0) {
        const newIndex = list.length;
        await database().ref(`/users/${newIndex}`).set({ value: inputTextValue });
        setInputValue('');
      } else {
        Alert.alert("Error", "Please enter the value");
      }
    } catch (error) {
      console.log(error);
    }
  };

 
 
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Todo App</Text>
      <TextInput
        style={{
          borderWidth: 1,
          width: '80%',
          borderRadius: 15,
          margin: 10,
          paddingLeft: 10,
        }}
        placeholder="Enter Value"
        value={inputTextValue}
        onChangeText={setInputValue}
      />
      
        <TouchableOpacity onPress={addData}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            Add Todo
          </Text>
        </TouchableOpacity>
      
      <View style={{ padding: 10, flex: 1 }}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
          
              <Text style={{ fontSize: 20, margin: 10, fontWeight: 'bold' }}>{item.value}</Text>
           
          )}
        />
      </View>
    </View>
  );
};

export default App;
