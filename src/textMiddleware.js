import React, { useState, useEffect, useContext } from 'react'
import { useGetState, StateContext } from './state';
import { changeForm } from './actions/workspaceActions'

const TextMiddleware = (props) => {
    const {state, dispatch} = useContext(StateContext);

    return (
        <p onClick={() => dispatch(changeForm('deskType', 'hot'))}>abc</p>
    )
}

export default TextMiddleware