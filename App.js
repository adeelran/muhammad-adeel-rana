import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { LogLevel, OneSignal } from 'react-native-onesignal';

const App = () => {

// Add OneSignal within your App's root component
const oneApp = () => {

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize("51aa9e63-5203-4ab0-9fe4-ad065e645252");

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });

}
useEffect(()=>{
  oneApp();
},[])
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App