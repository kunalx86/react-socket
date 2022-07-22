import { LOGIN, LOGIN_SERVER_ERROR, LOGIN_FIREBASE_ERROR, LOGIN_LOADING, LOGOUT, SIGNUP, SIGNUP_FIREBASE_ERROR, SIGNUP_LOADING, SIGNUP_SERVER_ERROR, FORGOT_PASSWORD, FORGOT_PASSWORD_LOADING, FORGOT_PASSWORD_ERROR } from "./actionTypes";

function authReducer(state, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isLoggedIn: true,
        error: "",
        firebaseError: ""
      }
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isLoggedIn: true,
        error: "",
        firebaseError: ""
      }
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case SIGNUP_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_FIREBASE_ERROR:
      return {
        ...state,
        isLoading: false,
        firebaseError: action.payload || "Something went wrong with Firebase"
      }
    case SIGNUP_FIREBASE_ERROR:
      return {
        ...state,
        isLoading: false,
        firebaseError: action.payload || "Something went wrong with Firebase"
      }
    case LOGIN_SERVER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong with server"
      }
    case SIGNUP_SERVER_ERROR:
    return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong with server"
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
        isLoggedIn: false,
        error: "",
        firebaseError: ""
      }
    case FORGOT_PASSWORD:
      return {
        ...state,
        user: null,
        isLoading: false,
        isLoggedIn: false,
        error: "",
        firebaseError: ""
      }
    case FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        user: null,
        isLoggedIn: false
      }
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        firebaseError: action.payload || "Something went wrong with Firebase"
      }
    default:
      throw new Error(`${action.type} not recognized`);
  }
}

export default authReducer;