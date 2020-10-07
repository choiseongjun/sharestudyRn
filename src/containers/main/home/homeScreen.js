import React,{useState,useEffect} from 'react';
import {FlatList, View} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import {Text} from 'react-native';
import {Image} from 'react-native';
import images from 'res/images';
import StoryContainer from './story/StoryContainer';
import axios from 'axios';

export default function homeScreen({navigation}) {
  const data = [
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
    {key: '6'},
    {key: '7'},
    {key: '8'},
    {key: '9'},
    {key: '10'},
  ];
  const [posts,setPosts] = useState([]);
  const storyOnPress = () => navigation.navigate('StoryScreen');
  useEffect(() => {
    axios.get('http://192.168.1.30:8080/feed')
    .then( response => { 
      console.log(response.data)
      setPosts(response.data); 
    } ) // SUCCESS
    .catch( response => { console.log(response); } ); // ERROR
  }, [])

  // const post = {
  //   userName: 'John Doe',
  //   placeName: 'Istanbul, Turkey',
  //   imgUrl: 'https://picsum.photos/1920/1080',
  //   likeCount: 103,
  //   commentCount: 21,
  //   text:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra.',
  //   publishDate: new Date().toDateString(),
  // };
  const stories = [
    {
      key: 'JohnDoe',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'CarlaCoe',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'DonnaDoe',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'JuanDoe',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'MartaMoe',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'PaulaPoe',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
  ];

  return (
    <FlatList
      style={{backgroundColor: colors.background}}
      data={posts}
      ListHeaderComponent={() => (
        <StoryContainer stories={stories} storyOnPress={storyOnPress} />
      )}
      renderItem={({item}) => (
        /*<View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={images.harun}
            style={{height: 512, width: 512, resizeMode: 'contain'}}
          />
        </View>
        */
        <Post post={item} />
      )}
    />
  );
}
