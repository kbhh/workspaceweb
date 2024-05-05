import React, { useContext, createContext, useReducer, useMemo  } from 'react';
import workspaceReducer, { initialState } from '../reducers/workspaceReducer'
import { changeForm, selectUnit, addWorkspace, fetchWorkpaceBookings } from '../actions/workspaceActions';

export const WorkspaceContext = createContext()

export const WorkspaceProvider = (props) => {
    const [state, dispatch] = useReducer(workspaceReducer, initialState)
    const value = useMemo(() => [state, dispatch], [state])
    return <WorkspaceContext.Provider value={value} {...props} />
}

export const useWorkspace = () => {
    const context = useContext(WorkspaceContext)
    if (!context) {
        throw new Error(`useWorkspace must be used within a WorkspaceProvider`)
    }
    const [state, dispatch] = context

    return {
        workspaceState: state,
        workspaceDispatch: dispatch,
        changeForm: (name, value, others) => changeForm(dispatch)(name, value, others),
        selectUnit: (unit) => selectUnit(dispatch)(unit),
        addWorkspace: (form) => addWorkspace(dispatch)(form),
        fetchWorkspace: () => fetchWorkpaceBookings(dispatch)()
    }
}