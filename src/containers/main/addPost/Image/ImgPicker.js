import React,{useState} from 'react';
import { View,Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useDispatch,useSelector } from 'react-redux';
import {UPLOAD_IMAGES_REQUEST} from '../../../../reducers/post';
import axios from 'axios';

export default function ImgPicker(){
  
  const dispatch = useDispatch();

  const [photo,setPhoto] = useState([]); 
  const handleChoosePhoto = () => {
    const options = {
      base64: true,
    };
    ImagePicker.launchImageLibrary(options, (photo) => {
      
      if (photo.uri) {
        setPhoto(photo)
        
        const base = 'data:image/jpeg;base64,'+photo.data;
  
        const formData = new FormData();
        formData.append("fileName",photo.fileName);
        formData.append("type",photo.type);
        formData.append("uri",photo.uri);
        formData.append("fileSize",photo.fileSize);
        formData.append("base",base);

       
        axios.post("http://172.30.1.46:8080/mobile/feed/upload",formData);
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
        {photo &&(
          <Image 
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
           />
        )} 
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
      </>
    )
}
