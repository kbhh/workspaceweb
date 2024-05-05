import React, { useEffect } from 'react'
import { useAuth } from '../../providers/AuthProvider'

export default props => {

    const {authState, logout} = useAuth()
    // logout user
    useEffect(() => {
        logout()
    }, [])

    return (
        <div class="pageloader"><span class="title">Loging out...</span></div>
    )
    
}