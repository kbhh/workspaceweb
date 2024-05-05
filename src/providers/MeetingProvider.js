import React, { useContext, createContext, useReducer, useMemo  } from 'react';
import meetingReducer, { initialState } from '../reducers/meetingReducer'
import { fetchRooms, selectMeetingRoom } from '../actions/meetingBookingActions';

export const MeetingContext = createContext()

export const MeetingProvider = (props) => {
    const [state, dispatch] = useReducer(meetingReducer, initialState)
    const value = useMemo(() => [state, dispatch], [state])
    return <MeetingContext.Provider value={value} {...props} />
}

export const useMeeting = () => {
    const context = useContext(MeetingContext)
    if (!context) {
        throw new Error(`useMeeting must be used within a MeetingProvider`)
    }
    const [state, dispatch] = context

    return {
        meetingState: state,
        meetingDispatch: dispatch,
        fetchRooms: () => fetchRooms(dispatch)(),
        selectMeetingRoom: (meetingRoom) => selectMeetingRoom(dispatch)(meetingRoom)
    }
}