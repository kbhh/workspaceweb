import { FETCH_MEETING_ROOMS, FETCH_MEETING_ROOMS_SUCCESS, FETCH_MEETING_ROOMS_ERROR, SELECT_MEETING_ROOM } from "../constants/actionContants";

export const initialState = {
  loading: false,
  form: {
    meetingRoomId: ''
  },
  selectedMeetingRoom: null,
  meetingRooms: [],
  error: null
}

export default (state, action) => {
  switch (action.type) {
    case FETCH_MEETING_ROOMS:
        return {
            ...state,
            loading: true
        }
    case FETCH_MEETING_ROOMS_SUCCESS:
        return {
            ...state,
            loading: false,
            meetingRooms: action.payload.rooms
        }
    case FETCH_MEETING_ROOMS_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error
        }
    case SELECT_MEETING_ROOM:
        return {
          ...state,
          selectedMeetingRoom: action.meetingRoom,
          form: {
            ...state.form,
            meetingRoomId: action.meetingRoom.id
          }
        }
    default:
      return state
    }
}