import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useHistory } from "../providers/HistoryProvider";

export default (props) => {
    const { authState } = useAuth()
    const { isLoggedIn } = authState
    const { history } = useHistory()
    // console.log('> private route', isLoggedIn)
    
    if(!isLoggedIn)
        history.push('/auth/login')
    return (
        <Route {...props} />
    )
}