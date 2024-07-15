import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [isdata, setisdata] = useState(null);
  useEffect(() => {
    Adddata();
  }, []);
  const Adddata = async () => {
    try {
      const data = await firestore()
        .collection('text')
        .doc('EqR0pWIKLKxUZqqSWQqF')
        .get();
      setisdata(data._data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>App</Text>
      <Text> {isdata?isdata.name:"loading"}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
