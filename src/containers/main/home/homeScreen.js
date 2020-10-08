import React,{useState,useEffect} from 'react';
import {FlatList, View} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import StoryContainer from './story/StoryContainer';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../../../reducers/post';

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
  const dispatch = useDispatch();
  const [posts,setPosts] = useState([]);
  const storyOnPress = () => navigation.navigate('StoryScreen');
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
  }, []) 

  const { mainPosts } = useSelector((state) => state.postReducer);
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
      data={mainPosts}
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
