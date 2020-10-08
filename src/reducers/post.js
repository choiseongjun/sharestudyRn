import produce from '../utils/produce';


export const initialState = {
    mainPosts: [],
    gallary:[],
    imagePaths: [],
    postComment:[],
    hasMorePosts: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
    removeCommentLoading: false,
    removeCommentDone: false,
    removeCommentError: null,
    updatePostLoading: false,
    updatePostDone: false,
    updatePostError: null,
    updateCommentLoading: false,
    updateCommentDone: false,
    updateCommentError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
  };


//피드 조회
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
//갤러리 조회
export const LOAD_GALLARY_REQUEST = 'LOAD_GALLARY_REQUEST';
export const LOAD_GALLARY_SUCCESS = 'LOAD_GALLARY_SUCCESS';
export const LOAD_GALLARY_FAILURE = 'LOAD_GALLARY_FAILURE';
//이미지 추가
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
//첨부한이미지 삭제
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
//피드추가
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
//피드삭제
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
//피드수정
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';
//피드좋아요
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
//피드좋아요취소
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';
//댓글추가
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
//댓글삭제
export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';
//댓글수정 
export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const postReducer = (state = initialState, action) => produce(state, (draft) => {
    console.log(action.data)
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case LOAD_GALLARY_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_GALLARY_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.gallary = action.data.concat(draft.gallary);
        draft.hasMorePosts = draft.gallary.length < 50;
        break;
      case LOAD_GALLARY_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.mainPosts.find((v) => v.id === action.data.id).content = action.data.content;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.id);
        post.feedlike.push({ userkey: action.data.user.id });
        draft.mainPosts.find((v) => v.id === action.data.id).totallike = action.data.totallike;
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.id);
        post.feedlike = post.feedlike.filter((v) => v.userkey !== action.data.user.id);
        draft.mainPosts.find((v) => v.id === action.data.id).totallike = action.data.totallike;
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: 
        const post = draft.mainPosts.find((v) => v.id === action.data.feedlistkey);
        post.feedreply.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS:
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        const removepostlist = draft.mainPosts.find((v) => v.id === action.data.postId)
        removepostlist.feedreply= removepostlist.feedreply.filter((v) => v.id !== action.data.commentId);
        break; 
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      case UPDATE_COMMENT_REQUEST:
        draft.updateCommentLoading = true;
        draft.updateCommentDone = false;
        draft.updateCommentError = null;
        break;
      case UPDATE_COMMENT_SUCCESS:
        draft.updateCommentLoading = false;
        draft.updateCommentDone = true;
        const updatepostlist = draft.mainPosts.find((v) => v.id === action.data.postId)
        updatepostlist.find((v) => v.id === action.data.id).content = action.data.content;
        break;
      case UPDATE_COMMENT_FAILURE:
        draft.updateCommentLoading = false;
        draft.updateCommentError = action.error;
        break;
      default:
        break;
    }
  });
  
  export default postReducer;
  