import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const Signup = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState("");
  const [message,setmessage]=useState("")
  const [name ,setname]=useState("")
  const navigation=useNavigation()
const handlelogin=async()=>{
  try {
    if(email.length>0&&password.length>0 &&name.length>0){
      const response =await auth()
      .createUserWithEmailAndPassword(email, password)
  const userdata={
    id:response.user.uid,
    name:name,
    email:email
  }
  await firestore().collection("users").doc(response.user.uid).set(userdata)
         //console.log(isusercreated);
         console.log(userdata)
      await auth().currentUser.sendEmailVerification();
      await   auth().signOut();
      Alert.alert("please verify your email check out link in your inbox ")
     navigation.navigate("Login")

    }else
    Alert.alert("Please Enter your Data")
    
  } catch (error) {
    console.log(error)
    setmessage(error.message)
  }
}

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Well Come</Text>
      <TextInput
        style={{
          borderWidth: 1,
          width: '80%',
          borderRadius: 15,
          margin: 10,
          paddingLeft: 10,
        }}
        placeholder="Enter your Name"
        value={name}
        onChangeText={(value)=>setname(value)}
      />
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
              backgroundColor: 'black',
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
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Login")
        }} >
          <Text
            style={{
              
              color: 'blue',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              fontSize:20
            }}>
             Already have an Account ?
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Signup;
