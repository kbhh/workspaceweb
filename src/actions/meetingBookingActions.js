import { FETCH_MEETING_ROOMS, FETCH_MEETING_ROOMS_SUCCESS, FETCH_MEETING_ROOMS_ERROR, SELECT_MEETING_ROOM } from "../constants/actionContants";
import LModel from "../services/api";

export const fetchRooms = dispatch => () => {
    dispatch({
        type: FETCH_MEETING_ROOMS,
    })
    console.log('fetching meeting rooms')
    LModel.find('MeetingRooms', '', 'filter[include]=pricings')
        .then(response => {
            dispatch({
                type: FETCH_MEETING_ROOMS_SUCCESS,
                payload: {
                    rooms: response
                }
            })
            console.log('fetching done meeting rooms', response)
        })
        .catch(error => {
            dispatch({
                type: FETCH_MEETING_ROOMS_ERROR,
                error: error.response
            })
        })
}

export const selectMeetingRoom = dispatch => (meetingRoom) => dispatch({
    type: SELECT_MEETING_ROOM,
    meetingRoom: meetingRoom
})
