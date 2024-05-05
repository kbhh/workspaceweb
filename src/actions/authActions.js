import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_ERROR, LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, REGISTER_REQUEST, REGISTER_REQUEST_SUCCESS, REGISTER_REQUEST_ERROR, CHECK_IS_LOGGEDIN, CHECK_IS_LOGGEDIN_SUCCESS, CHECK_IS_LOGGEDIN_ERROR } from "../constants/actionContants";
import LModel from "../services/api";
import AuthService from "../services/authService";

export const login = (dispatch) => (data, remember) => {
    
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                data: data,
                loading: true
            }
        })

        LModel.create('Accounts/login', data)
            .then(response => {
                AuthService.save_token(response, remember)

                setTimeout(() => {
                    dispatch({
                        type: LOGIN_REQUEST_SUCCESS,
                        payload: {
                            loading: false,
                            data: response
                        }
                    })
                }, 2000)
                // save data
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_REQUEST_ERROR,
                    payload: {
                        error: error,
                        loading: false
                    }
                })
            })
}

export const logout = (dispatch) => () => {
        dispatch({
            type: LOGOUT_REQUEST
        })
        LModel.create('Accounts/logout', {})
            .then(response => {
                dispatch({
                    type: LOGOUT_REQUEST_SUCCESS
                })
                AuthService.remove_token()
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_REQUEST_ERROR,
                    payload:{
                        error: error
                    }
                })
            })
}

export const register = (dispatch) => (data) => {
        dispatch({
            type: REGISTER_REQUEST,
            payload: {
                data: data
            }
        })
        LModel.create('Accounts', data)
            .then(response => {
                dispatch({
                    type: REGISTER_REQUEST_SUCCESS,
                    payload: {
                        data: response
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: REGISTER_REQUEST_ERROR,
                    payload: {
                        error: error.response
                    }
                })
            })
}

export const checkLoggedIn = () => {
    return dispatch => {
        dispatch({
            type: CHECK_IS_LOGGEDIN
        })

        if(AuthService.is_logged_in()){
            dispatch({
                type: CHECK_IS_LOGGEDIN_SUCCESS,
                payload: {
                    isLoggedIn: true
                }
            })
        } else {
            dispatch({
                type: CHECK_IS_LOGGEDIN_ERROR,
                payload: {
                    isLoggedIn: false
                }
            })
        }
    }
}