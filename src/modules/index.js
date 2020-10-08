import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import userSaga from '../sagas/user';
import postSaga from '../sagas/post';
import userReducer from '../reducers/user';
import postReducer from '../reducers/post';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.44:8080';
// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   const token = window.sessionStorage.getItem('user')
//   config.headers.Authorization =  "Bearer "+token;
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