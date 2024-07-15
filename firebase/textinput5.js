import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
const App = () => {
  const [inputTextValue, setInputValue] = useState(null);
  const [list, setlist] = useState(null);
  useEffect(() => {
    const Getdatabase = async () => {
      try {
       // const data = await database().ref('users').once('value');
       const data = await database().ref('users').on('value',(tempdata)=>{
        console.log(data);
        setlist(tempdata.val());
       } );
        
      } catch (error) {
        console.log(error);
      }
    };
    Getdatabase();
  }, []);

  const Dataapp = async () => {
    try {
      const indux= list.length;
      let response = await database()
        .ref(`/users/${indux}`)
        .set({value: inputTextValue});
      console.log('Response===>', response);

      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Todo App</Text>
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
        onChangeText={value => setInputValue(value)}
      />
      <View>
        <TouchableOpacity onPress={Dataapp}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            {' '}
            Add Todo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{padding:10,flex:1}}>
       <FlatList
       data={list}
       renderItem={(item)=> {
        //console.log(item)
        if(item.item !==null){
          return  <View style={{padding:10}}>
          <Text>{item.item.value}</Text> 
       </View>
        }
       
       }}
        />
      </View>
    </View>
  ); 
};

export default App;
