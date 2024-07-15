import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';

const App = () => {
  const [inputTextValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  const updateData = async () => {
    try {
      if (inputTextValue.length > 0) {
        await database().ref(`/users/${selectedCard}`).update({ value: inputTextValue });
        setInputValue('');
        setIsUpdate(false);
        setSelectedCard(null);
      } else {
        Alert.alert("Error", "Please enter the value");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (cardItem, cardValue) => {
    setIsUpdate(true);
    setSelectedCard(cardItem);
    setInputValue(cardValue);
  };
  const handleLongpress = (cardItem, cardValue) => {
    Alert.alert("Alert",`Are you sure to Delete  ${cardValue} ?`,[
      {
       text:"ok" ,
       onPress:async()=>{
        try {
          const response=await database().ref(`users/${cardItem}`).remove();
          console.log(response)
        } catch (error) {
          console.log(error)
        }
       }
       },
       {
        text:"cancel",
        onPress:()=>{

        }
       }
      
    ]

    )
    // setIsUpdate(true);
    // setSelectedCard(cardItem);
    // setInputValue(cardValue);
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
      {!isUpdate ? (
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
      ) : (
        <TouchableOpacity onPress={updateData}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            Update
          </Text>
        </TouchableOpacity>
      )}
      <View style={{ padding: 10, flex: 1 }}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ padding: 10 }}
             onPress={() => handleUpdate(item.key, item.value)}
             onLongPress={()=>handleLongpress(item.key, item.value)}
             >
              <Text style={{ fontSize: 20, margin: 10, fontWeight: 'bold' }}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default App;
