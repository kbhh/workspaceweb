import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_ERROR, LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_ERROR, REGISTER_REQUEST, REGISTER_REQUEST_SUCCESS, REGISTER_REQUEST_ERROR, CHECK_IS_LOGGEDIN, CHECK_IS_LOGGEDIN_ERROR, CHECK_IS_LOGGEDIN_SUCCESS } from "../constants/actionContants";
import AuthSerivce from "../services/authService";
export const initialState = {
  isLoggedIn: AuthSerivce.is_logged_in(),
  user: {},
  loading: false,
  error: null,
  loginRequested: false,
  loginSuccess: false,
  logoutSuccess: false,
  logoutError: false,
  registerSuccess: false
}

export default (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginRequested: true,
      }
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.data.user,
        loading: false,
        loginSuccess: true
      }
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...initialState,
        logoutSuccess: true
      }
    case LOGOUT_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        logoutError: true
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        registerSuccess: true
      }
    case REGISTER_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case CHECK_IS_LOGGEDIN:
      return {
        ...state,
        loading: true
      }
    case CHECK_IS_LOGGEDIN_ERROR:
      return {
        ...state,
        loading: false,
        isLoggedIn: false
      }
    case CHECK_IS_LOGGEDIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true
      }
    default:
      return state
  }
}