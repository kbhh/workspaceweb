import React, { useContext, createContext, useReducer, useMemo } from 'react'
import dashboardReducer, { initialState} from '../reducers/dashboardReducer'
import { TOGGLE_HAS_IMAGE } from '../constants/actionContants';

export const DashboardContext = createContext()

export const DashboardProvider = (props) => {
    const [state, dispatch] = useReducer(dashboardReducer, initialState)
    const value = useMemo(() => [state, dispatch], [state])
    return <DashboardContext.Provider value={value} {...props} />
}

export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error(`useDashboard must be used within a DashboardProvider`)
    }
    const [state, dispatch] = context

    const setImage = (image) => dispatch({
        type: TOGGLE_HAS_IMAGE,
        hasImage: true,
        image: image
    })

    const unsetImage = () => state.hasImage ? dispatch({
        type: TOGGLE_HAS_IMAGE,
        hasImage: false,
        image: null
    }) : ''
    
    return {
        state,
        setImage,
        unsetImage,
        dispatch
    }
}