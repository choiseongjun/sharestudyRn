import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import userSaga from '../sagas/user';
import postSaga from '../sagas/post';
import userReducer from '../reducers/user';
import postReducer from '../reducers/post';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

axios.defaults.baseURL = 'http://192.168.1.252:8080';
// Add a request interceptor
const token = AsyncStorage.getItem('user')
  token.then((value) => {
    axios.defaults.headers.common['Authorization'] = "Bearer "+value;
  });

// axios.interceptors.request.use(function (config) {
//   const token = AsyncStorage.getItem('user')
//   token.then((value) => {
//     config.header.authorization =  "Bearer "+value;
//     console.log("Bearer "+value)
//   });
//   return config;
// }); 

const rootReducer = combineReducers({
  userReducer,
  postReducer
});

export function* rootSaga() {
  yield all([
    userSaga(),
    postSaga()
  ]);
}

export default rootReducer;