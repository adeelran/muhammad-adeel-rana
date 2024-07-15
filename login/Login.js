import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState("");
  const [message,setmessage]=useState("")
  const navigation=useNavigation()
const handlelogin=async()=>{
  try {
   if(email.length>0&&password.length>0){
    const isuserlogin =await auth()
    .signInWithEmailAndPassword(email, password)

      console.log(isuserlogin);
      if(isuserlogin.user.emailVerified){
Alert.alert("you are verified")
// navigation.dispatch(
//   StackActions.replace("Home") 
// )
navigation.navigate("Home",{
  email: isuserlogin.user.email,
  uid:isuserlogin.user.uid,
  
 })
      }else 
      Alert.alert("please verify your email checkout inbox")
      await auth().currentUser.sendEmailVerification();
      await auth().signOut();
      setemail("")
      setpassword("")
  
   }else
   Alert.alert("Please Enter your Data")
  } catch (error) {
    console.log(error.message)
    setmessage(error.message)
  }
}

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login</Text>
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
            Login 
          </Text>
        </TouchableOpacity>
        <Text style={{color:"red"}}>{message}</Text>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Signup")
        }} >
          <Text
            style={{
              
              color: 'blue',
              paddingHorizontal: 70,
              paddingVertical: 10,
              borderRadius: 20,
              fontSize:20
            }}>
             New User Signup ?
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Login;
