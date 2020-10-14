import axios from 'axios';
import { all, delay, fork, put, takeLatest,takeEvery, throttle ,call} from 'redux-saga/effects';
import {
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_GALLARY_REQUEST,
    LOAD_GALLARY_SUCCESS,
    LOAD_GALLARY_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    UPDATE_POST_REQUEST,
    UPDATE_POST_FAILURE,
    UPDATE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    REMOVE_COMMENT_REQUEST,
    REMOVE_COMMENT_SUCCESS,
    REMOVE_COMMENT_FAILURE,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE
  } from '../reducers/post';

function loadPostsAPI(data) {
    return axios.get('/feed', data);
}
function uploadImagesAPI(formData) {
  return axios.post('/mobile/feed/upload', formData);
}
function* loadPosts(action) {
    try {
         const result = yield call(loadPostsAPI, action.data);
        //yield delay(1000);
        yield put({
        type: LOAD_POSTS_SUCCESS,
        data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOAD_POSTS_FAILURE,
        data: err.response.data,
        });
    }
}
function loadGallaryAPI(data) {
  return axios.get('/gallary', data);
}
function* loadGallary(action) {
    try {
        const result = yield call(loadGallaryAPI, action.data);
        
        yield put({
        type: LOAD_GALLARY_SUCCESS,
        data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOAD_GALLARY_FAILURE,
        data: err.response.data,
        });
    }
}
function* uploadImages(action) {
  console.log(action.data)
  try {
    const result = yield call(uploadImagesAPI, action.data);
    
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}
function addPostAPI(data) {
  return axios.post('/feed', data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function removePostAPI(data) {
  return axios.delete(`/feed/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function updatePostAPI(data) {
  return axios.patch(`/feed/${data.id}`, data);
}
function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function likePostAPI(id) {
  return axios.post(`/likefeed/${id}`);
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function unlikePostAPI(id) {
  return axios.delete(`/likefeed/${id}`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function addCommentAPI(data) {
  return axios.post(`/feed/reply/${data.id}`, data); // POST /post/1/comment
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}
function removeCommentAPI(id) {
  return axios.delete(`/feed/reply/${id}`); 
}
function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}
function updateCommentAPI(data) {
  return axios.patch(`/feed/reply/${data.id}`,data.content); 
}
function* updateComment(action) {
  try {
    const result = yield call(updateCommentAPI, action.data);
    
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadGallary() {
    yield throttle(5000, LOAD_GALLARY_REQUEST, loadGallary);
}
function* watchUploadImages() {
    yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchUpdatePost() {
    yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
    yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}
function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}
export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadGallary),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchUpdatePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchUpdateComment),
  ]);
}
