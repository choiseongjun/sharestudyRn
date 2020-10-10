import React from 'react';
import {View, Text} from 'react-native';
import palette from 'res/palette';
import ImgPicker from './Image/ImgPicker';


export default function addPostScreen() {
  return (
    <>
      <Text style={palette.text}>Add Post</Text>
      {/* <ViewPhotos /> */}
      <ImgPicker />
    </>
  );
}
