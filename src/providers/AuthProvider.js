import React, { useReducer, useContext, useMemo, createContext, useEffect } from 'react'
import authReducer, { initialState } from '../reducers/authReducer'
import { login as remoteLogin, register as remoteRegister, logout as remoteLogout} from '../actions/authActions'
import { useHistory } from './HistoryProvider'
import { LOGOUT_REQUEST_SUCCESS } from '../constants/actionContants';
import { toast } from 'bulma-toast/dist/bulma-toast.cjs';
export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    const value = useMemo(() => [state, dispatch], [state])
    return <AuthContext.Provider value={value} {...props} />
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within a AuthProvider')
    }

    const [authState, dispatch] = context
    const {history} = useHistory()
    const login = (data, remember) => remoteLogin(dispatch)(data, remember)
    const register = (data) => remoteRegister(dispatch)(data)
    const logout = () => authState.isLoggedIn ? remoteLogout(dispatch)() : dispatch({
        type: LOGOUT_REQUEST_SUCCESS
    })

    // redirect after logout
    useEffect(() => {
        if(authState.logoutSuccess || authState.logoutError) {
            history.push('/auth/login')
        }

    }, [authState.logoutSuccess, authState.logoutError, history])

    // redirect after login success
    useEffect(() => {
        if(authState.loginSuccess) history.push('/dashboard')
    }, [authState.loginSuccess, history])

    // redirect after login success
    useEffect(() => {
        if(authState.registerSuccess){
            toast({
                message: "Registration is successfull.",
                type: "is-success",
                dismissible: true,
                pauseOnHover: true
              });
              history.push('/auth/login')
        }
    }, [authState.registerSuccess, history])

    return {
        authState,
        dispatch,
        login,
        logout,
        register
    }
}