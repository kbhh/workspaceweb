import { FETCH_LOCATIONS, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_ERROR, LOCATIONS_SELECT, FETCH_LOCATION_AVAILABLE_DESKS, FETCH_LOCATION_AVAILABLE_DESKS_SUCCESS, FETCH_LOCATION_AVAILABLE_DESKS_ERROR } from "../constants/actionContants";
import LModel from "../services/api";

export const fetchLocations =(dispatch) => () => {
        dispatch({
            type: FETCH_LOCATIONS,
        })

        LModel.find('Locations')
            .then(response => {
                dispatch({
                    type: FETCH_LOCATIONS_SUCCESS,
                    payload: {
                        locations: response
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: FETCH_LOCATIONS_ERROR,
                    payload: {
                        locations: error
                    }
                })
            })
}

export const selectLocation = dispatch => (id) => dispatch({
    type: LOCATIONS_SELECT,
    id: id
})

export const fetchAvailableDesks = dispatch => (id) => {
        dispatch({
            type: FETCH_LOCATION_AVAILABLE_DESKS,
            locationId: id
        })

        LModel.find(`Locations/${id}/subscriptionServices`, '', 'filter[where][isOccupied]=false&filter[include]=pricings')
            .then(response => {
                // console.log('> desks', response)
                dispatch({
                    type: FETCH_LOCATION_AVAILABLE_DESKS_SUCCESS,
                    payload: {
                        hot: response.filter(service => service.category === 'hot desk' && service.pricings.length > 0),
                        enclosed: response.filter(service => service.category === 'enclosed' && service.pricings.length > 0),
                        dedicated: response.filter(service => service.category === 'dedicated' && service.pricings.length > 0)
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: FETCH_LOCATION_AVAILABLE_DESKS_ERROR,
                    error: error
                })
            })
}