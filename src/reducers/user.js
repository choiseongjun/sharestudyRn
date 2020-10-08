import produce from '../utils/produce';

export const initialState = {
    logInDone: false, // 로그인 여부
    logInLoading: false, // 로그인 시도중
    logInError: '', // 로그인 실패 사유
    logOutLoading: false, // 로그아웃 시도중
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,//회원가입 성공
    signUpError: null,
    me: null, // 로그인 토큰 정보
    userInfo: [], // 나의 정보
    profileimagePaths: [],
    userinfoLoading:false, //내정보로딩
    userinfoDone:false,//내정보로딩완료
    userinfoError:null,
    uploadProfileImagesLoading: false,
    uploadProfileImagesDone: false,
    uploadProfileImagesError: null,
  };
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

export const UPLOAD_PROFILE_IMAGES_REQUEST = 'UPLOAD_PROFILE_IMAGES_REQUEST';
export const UPLOAD_PROFILE_IMAGES_SUCCESS = 'UPLOAD_PROFILE_IMAGES_SUCCESS';
export const UPLOAD_PROFILE_IMAGES_FAILURE = 'UPLOAD_PROFILE_IMAGES_FAILURE';

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});
export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});
const userReducer = (state = initialState, action) => produce(state, (draft) => {
  
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.me = action.data.jwt;
      draft.logInDone = true;
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error.response.data;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutError = null;
      draft.logOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      draft.userInfo = [];
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case USER_INFO_REQUEST:
      draft.userinfoLoading=true;
      draft.userinfoDone=false;
      break;
    case USER_INFO_SUCCESS:
      draft.userinfoDone=true;
      draft.userinfoLoading=false;
      draft.userInfo=action.data
      break;
    case USER_INFO_FAILURE:
      draft.userinfoDone=true;
      draft.userinfoLoading=false;
      draft.userinfoError = action.error.response.data;
      break;
    case UPLOAD_PROFILE_IMAGES_REQUEST:
      draft.uploadProfileImagesLoading = true;
      draft.uploadProfileImagesDone = false;
      draft.uploadProfileImagesError = null;
      break;
    case UPLOAD_PROFILE_IMAGES_SUCCESS: {
      draft.profileimagePaths = action.data;
      draft.uploadProfileImagesLoading = false;
      draft.uploadProfileImagesDone = true;
      break;
    }
    case UPLOAD_PROFILE_IMAGES_FAILURE:
      draft.uploadProfileImagesLoading = false;
      draft.uploadProfileImagesError = action.error;
      break;
    default:
      break;
    }
  });
  export default userReducer;
