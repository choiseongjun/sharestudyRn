import React,{useState,useCallback,useEffect} from 'react';
import { View,TextInput, Image, Button,ScrollView,StyleSheet } from 'react-native';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from "react-native-customized-image-picker";
import { useDispatch } from 'react-redux';
import {UPLOAD_IMAGES_REQUEST,REMOVE_IMAGE,ADD_POST_REQUEST,UPLOAD_IMAGES_INIT} from '../../../../reducers/post';
import Spinner from 'react-native-loading-spinner-overlay';

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}
export default function ImgPicker({resimgurl,uploadImagesDone}){
  
  const dispatch = useDispatch();
  const [spinner,setSpinner] = useState(false)
  const [photo,setPhoto] = useState([]); 
  //const [resimgurl,setResimgurl] = useState([]); 
  const [content, setContent] = useState('');

  useEffect(() => {
    if(uploadImagesDone){
      setSpinner(false)
      dispatch({
        type: UPLOAD_IMAGES_INIT
      });

    }
  },[uploadImagesDone])

  const onSubmit = useCallback(() => {
    

    const formData = new FormData();
    resimgurl.forEach((p) => {
      formData.append('images',p);
    });
    formData.append('content', content);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  },[content, resimgurl])
  const handleChoosePhoto = () => {
    
    ImagePicker.openPicker({
      includeBase64:true,
      multiple: true
    }).then(photo => {
      setPhoto(photo)
      const formData = new FormData();
      photo.map((image,key) =>{
        const base = 'data:image/jpeg;base64,'+image.data;
        const tmpName = image.path;
        const imageName = tmpName.split("/").pop()

        
        formData.append("fileName",imageName);
        formData.append("type",image.mime);
        formData.append("fileSize",image.size);
        formData.append("base",base);
        // axios.post("http://172.30.1.46:8080/mobile/feed/upload",formData)
        // .then(res=>{
        //    var arr=[]
        //    arr.push(res.data)
        //    for (var i = 0; i < arr.length; i++) {
        //     console.log(arr[i]);
        //   }
        // })
      });
      dispatch({
          type: UPLOAD_IMAGES_REQUEST,
          data: formData,
      });
      setSpinner(true)
      // axios.post("http://192.168.1.252:8080/mobile/feed/upload",formData)
      // .then((res)=>{
      //   console.log(res.data)
      //   setResimgurl(res.data)
      // })
    });
   
  }

    // const { photo } = this.state;
    const photos = photo.map((photoone,key) =>(
            <Image 
            source={{ uri: photoone.path }}
            style={{ width: 300, height: 300 }}
          />
    ));
    return (
      <>
      <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <View>
        <View
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
          }}> 
          <UselessTextInput
            multiline
            numberOfLines={4}
            onChangeText={text => setContent(text)}
            value={content}
          />
        </View>
        <Button
          onPress={onSubmit}
          title="글쓰기"
          color="#841584"
          accessibilityLabel="글쓰기"
        /> 
        <Button title="사진첨부하기" onPress={handleChoosePhoto} />
        <ScrollView>
          {photos}
        </ScrollView>
        
      </View>
      </>
    )
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  }
});