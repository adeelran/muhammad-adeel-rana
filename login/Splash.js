import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        const RouterName = user !== null ? 'Home' : 'Login';
        
        navigation.dispatch(StackActions.replace(RouterName));
      }, 3000);
    });

    // Unsubscribe on cleanup
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
