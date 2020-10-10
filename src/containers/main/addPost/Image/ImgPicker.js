import React,{useState} from 'react';
import { View,Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useDispatch,useSelector } from 'react-redux';
import {UPLOAD_IMAGES_REQUEST} from '../../../../reducers/post';
import axios from 'axios';
import FileSystem from 'react-native-filesystem';


export default function ImgPicker(){
  const dispatch = useDispatch();

  const [photo,setPhoto] = useState(''); 
  const handleChoosePhoto = () => {
    const options = {
      base64: true,
    };
    ImagePicker.launchImageLibrary(options, (photo) => {
      if (photo.uri) {
        //this.setState({ photo: response });
        console.log('this')
        setPhoto(photo)
        console.log(photo)
        
        // const result = dataURLtoFile(photo.data,photo.fileName);
        // console.log(result)
        // let MobileImage = {};
        // MobileImage.name=photo.fileName;
        // MobileImage.type="image/jpeg";
        // MobileImage.uri=photo.uri;
        const file = {
          type: photo.type,
          name: photo.fileName,
          uri:photo.uri,
         }
         const base64 = FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
         console.log(base64)
        const formData = new FormData();
        formData.append("images",JSON.stringify(file));
        const config = {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          "content-type": "multipart/form-data"
        }
        };
        // //console.log(MobileImage);
        axios.post("http://192.168.0.12:8080/mobile/feed/upload",formData,config);
        // dispatch({
        //   type: UPLOAD_IMAGES_REQUEST,
        //   data: data,
        // })
      }
    })
  }
 
  
    // const { photo } = this.state;
    return (
      <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* {photo &&(
          <Image 
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
           />
        )}  */}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
      </>
    )
}
