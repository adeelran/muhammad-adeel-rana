// import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import auth from '@react-native-firebase/auth';
// const Mobile = () => {
//     const [mobile,setmobile]=useState("");
//     const [otpinput,setotpinput]=useState("")
//     const [confarmdata,setconfarmdata]=useState("")
//     const Sendotp =async()=>{
// try {
//     const response=await auth().signInWithPhoneNumber(mobile);
//     setconfarmdata(response);
//     console.log(response)
//     Alert.alert(" OTP is send please  verify it")
// } catch (error) {
//     console.log(error)
// }
//     }

//     const Submitotp =()=>{
//         try {
            
//         } catch (error) {
//             console.log(error)
//         }
//             }
//   return (
//     <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
//       <Text style={{fontSize:30}}>Mobile</Text>
//       <TextInput value={mobile} onChangeText={(value)=>setmobile(value)}
//       style={{borderWidth:1,width:"80%",borderRadius:15,padding:10,margin:20}}  
//        placeholder='Enter your Mobile Number'/>
//        <TouchableOpacity  onPress={Sendotp()}
//        style={{width:"50%",backgroundColor:"blue",padding:10,borderRadius:15}}>
//         <Text style={{color:"white",textAlign:"center",}}>Send OTP</Text>
//        </TouchableOpacity>
//        <TextInput  value={otpinput} onChangeText={(value)=>setotpinput(value)}
//         style={{borderWidth:1,width:"80%",borderRadius:15,padding:10,margin:20}}  
//        placeholder='Enter your OTP'/>
//        <TouchableOpacity onPress={Submitotp()}
//        style={{width:"50%",backgroundColor:"blue",padding:10,borderRadius:15}}>
//         <Text style={{color:"white",textAlign:"center"}}>SUBMIT</Text>
//        </TouchableOpacity>
//     </View>
//   )
// }

// export default Mobile

// const styles = StyleSheet.create({})


import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

const Mobile = () => {
    const [mobile, setMobile] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [confirmData, setConfirmData] = useState("");

    const sendOtp = async () => {
        try {
            
            const response = await auth().signInWithPhoneNumber(mobile);
            setConfirmData(response);
            console.log(response);
            Alert.alert("OTP is sent, please verify it");  
        } catch (error) {
            console.log(error);
        }
    };

    const submitOtp = async () => {
        try {
            await confirmData.confirm(otpInput);
            Alert.alert("OTP verified successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 30 }}>Mobile</Text>
            <TextInput
                value={mobile}
                onChangeText={(value) => setMobile(value)}
                style={{ borderWidth: 1, width: "80%", borderRadius: 15, padding: 10, margin: 20 }}
                placeholder='Enter your Mobile Number'
                keyboardType="phone-pad"
            />
            <TouchableOpacity
                onPress={sendOtp}
                style={{ width: "50%", backgroundColor: "blue", padding: 10, borderRadius: 15 }}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Send OTP</Text>
            </TouchableOpacity>
            <TextInput
                value={otpInput}
                onChangeText={(value) => setOtpInput(value)}
                style={{ borderWidth: 1, width: "80%", borderRadius: 15, padding: 10, margin: 20 }}
                placeholder='Enter your OTP'
                keyboardType="number-pad"
            />
            <TouchableOpacity
                onPress={submitOtp}
                style={{ width: "50%", backgroundColor: "blue", padding: 10, borderRadius: 15 }}
            >
                <Text style={{ color: "white", textAlign: "center" }}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Mobile;

const styles = StyleSheet.create({});
