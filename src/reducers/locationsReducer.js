import { FETCH_LOCATIONS, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_ERROR, LOCATIONS_SELECT, FETCH_LOCATION_AVAILABLE_DESKS, FETCH_LOCATION_AVAILABLE_DESKS_SUCCESS, FETCH_LOCATION_AVAILABLE_DESKS_ERROR } from "../constants/actionContants";

export const initialState = {
    loading: false,
    locations: [],
    selectedLocation: null,
    error: null,
    desks: {
        hot: [],
        dedicated: [],
        enclosed: []
    }
}

export default (state, action) => {
    switch (action.type) {
        case FETCH_LOCATIONS:
            return {
                ...state,
                loading: true
            }
        case FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: action.payload.locations
            }
        case FETCH_LOCATIONS_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        case LOCATIONS_SELECT:
            let location = state.locations.filter(location => location.id === action.id)
            return {
                ...state,
                selectedLocation: location.length ? location[0] : null
            }
        case FETCH_LOCATION_AVAILABLE_DESKS:
            return {
                ...state,
                loading: true
            }
        case FETCH_LOCATION_AVAILABLE_DESKS_SUCCESS:
            return {
                ...state,
                loading: false,
                desks: action.payload
            }
        case FETCH_LOCATION_AVAILABLE_DESKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
        }
}