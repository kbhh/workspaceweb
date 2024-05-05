import React, {createContext, useContext, useReducer, useState} from 'react'

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, middlewares, children}) => {
    let [state, dispatch] = useReducer(reducer, initialState)
    const applyMiddlewares = (action) => {
        if(middlewares instanceof Array && middlewares.length){
            middlewares.forEach(middleware => {
                middleware(getState)(dispatch)(action)
            })
        }
    }
    const dispatchWrapper = action => {
        console.log(state)
        applyMiddlewares(action)
    }

    const getState = () => state

    return (
        <StateContext.Provider value={{
            state: state,
            dispatch: dispatchWrapper
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useGetState = () => useContext(StateContext);
