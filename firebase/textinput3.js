import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
  import database from '@react-native-firebase/database';
  
  const App = () => {
    const [inputTextValue,setInputValue]=useState(null)
    const setData = async () => {
      try {
        let response = await database()
          .ref('/users/1')
          .set({value:inputTextValue});
        console.log('Response===>', response);
      } catch (error) {
        console.log(error.message);
      }
    };
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}> Todo App</Text>
        <TextInput
          style={{borderWidth: 1, borderRadius: 15, width: '80%', margin: 10}}
          placeholder="Enter Value" value={inputTextValue} onChangeText={(value)=>setInputValue(value)}
        />
  
        <TouchableOpacity onPress={setData}>
          <Text
            style={{
              backgroundColor: '#000',
              color: '#fff',
              paddingVertical: 10,
              paddingHorizontal: 40,
              borderRadius: 10,
              width: '50%',
            }}>
            Add Todo
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default App;
  
  const styles = StyleSheet.create({});
  