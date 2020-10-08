import React,{useCallback,useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import profileScreen from './profileScreen';
import {Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'res/colors';
import images from 'res/images';
import HamberMenu from './HamberMenu';
import {useSelector,useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../../../reducers/user';


export default function profileNavigator({navigation}) {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const { me} = useSelector((state) => state.userReducer);
  const onClickLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);
  useEffect(() => {
   
    if(!me){
      console.log('this')
      navigation.navigate('LoginScreen')
    }
  }, [me]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={profileScreen}
        options={{
          headerTitle: (
            <TouchableOpacity 
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                johndoe
              </Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: colors.seperatorLineColor,
          },
          headerRight: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop:0,
                  marginRight: 10,
                }}>
                <HamberMenu onClickLogout={onClickLogout} />
              </View>
          ),
          headerLeft: () => (
            <TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginStart: 10,
                }}>
                <Image
                  source={images.addIcon}
                  style={{resizeMode: 'contain', width: 20, height: 20}}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
