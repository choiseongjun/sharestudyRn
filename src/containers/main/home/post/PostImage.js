import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

export default function PostImage({post}) {
   if (post.uploadfile.length === 1) {
    return <Image source={{uri: post.uploadfile[0].src}} style={Styles.postImg} />;
   }else if(post.uploadfile.length === 2){
    return (<>
              <Image source={{uri: post.uploadfile[0].src}} style={Styles.postImg} />
              <Image source={{uri: post.uploadfile[1].src}} style={Styles.postImg} />
            </>)
  }else if(post.uploadfile.length === 4) {
    return (<>
              <Image source={{uri: post.uploadfile[0].src}} style={Styles.postImg} />
              <Image source={{uri: post.uploadfile[1].src}} style={Styles.postImg} />
              <Image source={{uri: post.uploadfile[2].src}} style={Styles.postImg} />
              <Image source={{uri: post.uploadfile[3].src}} style={Styles.postImg} />
            </>)
    
   }else{
     return null
   }
   //return null
}

const Styles = StyleSheet.create({
  postImg: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    resizeMode: 'contain',
  },
});
