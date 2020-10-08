import { all, fork, put, takeLatest,takeEvery,call } from 'redux-saga/effects';
import axios from 'axios';
import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  UPLOAD_PROFILE_IMAGES_REQUEST,
  UPLOAD_PROFILE_IMAGES_SUCCESS,
  UPLOAD_PROFILE_IMAGES_FAILURE
} from '../reducers/user';




function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/api/auth/signup',signUpData);
}

function* signUp(action) {
  try {
    
    yield call(signUpAPI, action.data);
    //yield delay(2000);
    //throw new Error('에러에러에러');
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e); 
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}
function logInAPI(data) {
  return axios.post('/api/auth/signin', data);
}
function* logIn(action) {
  try {
    
    const result = yield call(logInAPI,action.data);
    //yield delay(1000);
   
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post('/user/logout');
}
function* logOut() {
  try {
    //yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}
function userInfoAPI() {
  return axios.get('/api/auth/userinfo');
}
function* userInfo() {
  try {
    const result = yield call(userInfoAPI);
    yield put({
      type: USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_INFO_FAILURE,
      error: err.response.data,
    });
  }
}
function uploadProfileImagesAPI(data) {
  console.log(data)
  return axios.post('/api/auth/profileimage', data);
}
function* uploadProfileImages(action) {
  try {
    const result = yield call(uploadProfileImagesAPI, action.data);
    
    yield put({
      type: UPLOAD_PROFILE_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_PROFILE_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchUserInfo() {
  yield takeLatest(USER_INFO_REQUEST, userInfo);
}
function* watchProfileUploadImages() {
  yield takeEvery(UPLOAD_PROFILE_IMAGES_REQUEST, uploadProfileImages);
}
export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchUserInfo),
    fork(watchLogOut),
    fork(watchProfileUploadImages),
  ]);
}
