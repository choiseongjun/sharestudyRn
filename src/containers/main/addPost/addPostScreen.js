import React,{useEffect,useState} from 'react';
import {Text} from 'react-native';
import palette from 'res/palette';
import ImgPicker from './Image/ImgPicker';

import { useSelector,useDispatch } from 'react-redux';
import {ADD_POST_INIT,UPLOAD_IMAGES_INIT} from '../../../reducers/post';


export default function addPostScreen({navigation}) {
  
  const dispatch = useDispatch();
  const {addPostDone,resimgurl,uploadImagesDone}=useSelector((state) => state.postReducer);
  useEffect(() => {
  if(addPostDone){
    navigation.navigate('MainScreen');

    dispatch({
      type: ADD_POST_INIT
    });
  }   
 
  }, [addPostDone])
 
  return (
    <>
     
      <Text style={palette.text}>Add Post</Text>
      {/* <ViewPhotos /> */}
      <ImgPicker resimgurl={resimgurl} uploadImagesDone={uploadImagesDone} />
    </>
  );
}
