import React, { useContext, createContext, useReducer, useMemo } from 'react'
import locationReducer, { initialState } from '../reducers/locationsReducer'
import { fetchLocations, selectLocation, fetchAvailableDesks } from '../actions/locationActions';

export const LocationContext = createContext()

export const LocationProvider = (props) => {
    const [state, dispatch] = useReducer(locationReducer, initialState)
    const value = useMemo(() => [state, dispatch], [state])
    return <LocationContext.Provider value={value} {...props} />
}

export const useLocation = () => {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error(`useLocation must be used within a LocationProvider`)
    }
    const [state, dispatch] = context

    return {
        locationState: state,
        locationDispatch: dispatch,
        fetchLocations: () => fetchLocations(dispatch)(),
        selectLocation: (id) => selectLocation(dispatch)(id),
        fetchAvailableDesks: (id) => fetchAvailableDesks(dispatch)(id)
    }
}