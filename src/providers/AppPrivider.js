import React, { createContext, useReducer, useMemo, useContext, useState, useEffect } from 'react'
import globalReducer, { initialState } from '../reducers/globalReducer'
import { uploadFile, setTitle } from '../actions/globalActions'

export const AppContext = createContext()

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(globalReducer, initialState)
    const value = useMemo(() => [state, dispatch], [state])
    return <AppContext.Provider value={value} {...props} />
}

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error(`useApp must be used within a AppProvider`)
    }
    const [state, dispatch] = context
    
    const upload = (container, file, cb) => uploadFile(dispatch)(container, file, cb)
    const setPageTitle = (title) => setTitle(dispatch)(title)
    
    return {
        state,
        // dispatch,
        upload,
        setPageTitle
    }
}

export const useCheckedSetTitle = (title) => {
    const { setPageTitle } = useApp()
    const [isSet, setIsSet] = useState(false)

    useEffect(() => {
        // console.log('setting title')
        if(!isSet){
        setPageTitle(title)
        setIsSet(true)
        }
        
    },[isSet, title, setPageTitle])
}