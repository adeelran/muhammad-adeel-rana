import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState("");
  const [message,setmessage]=useState("")
const handlelogin=async()=>{
  try {
    const data=await auth()
    .createUserWithEmailAndPassword(email, password)
setemail("")
setpassword("")
      console.log(data);
   
  } catch (error) {
    console.log(error)
    setmessage(error.message)
  }
}

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Forms</Text>
      <TextInput
        style={{
          borderWidth: 1,
          width: '80%',
          borderRadius: 15,
          margin: 10,
          paddingLeft: 10,
        }}
        placeholder="Enter your Email"
        value={email}
        onChangeText={(value)=>setemail(value)}
      />
       <TextInput
        style={{
          borderWidth: 1,
          width: '80%',
          borderRadius: 15,
          margin: 10,
          paddingLeft: 10,
        }}
        placeholder="Enter your Password"
        value={password}
        onChangeText={(value)=>setpassword(value)}
        secureTextEntry={true}
      />
      
        <TouchableOpacity  onPress={()=> handlelogin()}>
          <Text
            style={{
              backgroundColor: 'blue',
              color: 'white',
              paddingHorizontal: 120,
              paddingVertical: 10,
              borderRadius: 20,
              fontSize:20
            }}>
            Signup
          </Text>
        </TouchableOpacity>
        <Text style={{color:"red"}}>{message}</Text>
    </View>
  );
};

export default App;
