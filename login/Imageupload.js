import { View, Text,TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
const Imageupload = () => {
    const [imagedata,setimagedata]=useState(null)
    const pickimage =async()=>{
try {
 const response= await DocumentPicker.pickSingle( {
    type:[DocumentPicker.types.images],
    copyTo:"cachesDirectory"
})
console.log(response)
setimagedata(response)
} catch (error) {
   console.log(error) 
}
    }
    const UploadImage=async()=>{
        try {

         const response=await storage().ref(`profile/${imagedata.name} `).putFile(imagedata.fileCopyUri)
         console.log(response)
        } catch (error) {
         console.log(error)   
        }
    }
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        {
            imagedata ? (
                <Image source={{uri:imagedata.uri}}  style={{height:"40%",width:"50%"}}/>
            ):<Text> No Image found</Text>
        }
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity
               onPress={pickimage}
                style={{ width: "40%", backgroundColor: "blue", padding: 10, borderRadius: 15 ,marginTop:10,marginRight:10}}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={UploadImage}
                style={{ width: "40%", backgroundColor: "blue", padding: 10, borderRadius: 15 ,marginTop:10}}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Upload Image</Text>
            </TouchableOpacity>
        </View>
    
    </View>
  )
}

export default Imageupload


