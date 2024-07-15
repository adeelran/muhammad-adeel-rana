// import { View, Text,TouchableOpacity } from 'react-native'
// import React from 'react'
// import { useNavigation, useRoute } from '@react-navigation/native'
// import auth from '@react-native-firebase/auth';
// const Home = () => {
//     const route=useRoute()
//    const {email,uid}=route.params;
//    const navigation=useNavigation()
//   return (
//     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
//       <Text>Home</Text>
//       <Text>Email:{email} </Text>
//       <Text>Uid:{uid}</Text>
//       {/* <Text> Email:{auth().currentUser.email} </Text>
//       <Text> uid:{auth().currentUser.uid} </Text> */}
//        <TouchableOpacity onPress={
//         async()=>{
//             await auth().signOut();
//             navigation.navigate("Login")
//         }
//        } >
//           <Text
//             style={{
//               backgroundColor: 'blue', 
//               color: 'white',
//               paddingHorizontal: 100,
//               paddingVertical: 10,
//               borderRadius: 20,
//               fontSize:20,
//               marginTop:20
//             }}>
//             signout
//           </Text>
//         </TouchableOpacity>
//     </View>
//   )
// }

// export default Home


import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    
    if (route.params) {
      setEmail(route.params.email);
      setUid(route.params.uid);
    } else {
      const user = auth().currentUser;
      if (user) {
        setEmail(user.email);
        setUid(user.uid);
      } else {
        navigation.navigate("Login");
      }
    }
  }, [route.params]);

  const handleSignOut = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await auth().signOut();
        console.log("Sign-out successful");
         //   navigation.dispatch(
      //     StackActions.popToTop("Login")
        //navigation.dispatch( "Login" )
        navigation.navigate("Login");
      } else {
        console.log("No user currently signed in");
        Alert.alert("No user currently signed in");
      //   navigation.dispatch(
      //     StackActions.popToTop("Login")
      // )
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Sign-out Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       {/* <TouchableOpacity onPress={()=>navigation.navigate("Imageupload")} >
        <Text
          style={{
            backgroundColor: 'blue',
            color: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            fontSize: 20,
            marginTop: 20,
          }}
        >
          Upload Image
        </Text>
      </TouchableOpacity> */}
      <Text>Home</Text>
      <Text>Email: {auth().currentUser.email} </Text>
      <Text>Uid: { auth().currentUser. uid}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text
          style={{
            backgroundColor: 'blue',
            color: 'white',
            paddingHorizontal: 100,
            paddingVertical: 10,
            borderRadius: 20,
            fontSize: 20,
            marginTop: 20,
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
     
    </View>
  );
};

export default Home;
