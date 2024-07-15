import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';
import Login from './login/Login'
import Signup from './login/Signup'
import Home from './login/Home'
import Mobile from './login/Mobile'
import Imageupload from './login/Imageupload'
import Splash from './login/Splash';


const Stack=createNativeStackNavigator()
const App = () => {
 
  return (
    <NavigationContainer >
<Stack.Navigator >
<Stack.Screen   name='Splash'  component={Splash} 
  options={{headerShown:false}}
  /> 
 
  <Stack.Screen   name='Login'  component={Login} 
  options={{headerShown:false}}/>


 <Stack.Screen   name='Signup'  component={Signup} 
 options={{headerShown:false}}
 />

 
  <Stack.Screen   name='Home'  component={Home} 
  options={{headerShown:false}}
  /> 
  {/* <Stack.Screen   name='Imageupload'  component={Imageupload} 
  options={{headerShown:false}} /> */}
  {/* <Stack.Screen   name='mobile'  component={Mobile} 
  options={{headerShown:false}} /> */}
</Stack.Navigator>
    </NavigationContainer> 
  )
}
export default App

const styles = StyleSheet.create({})