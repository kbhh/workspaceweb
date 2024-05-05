import React, { useEffect } from 'react'
import DashboardLayout from '../../../../components/Dashboard/DashboardLayout';
import { Subtitle, Container, Columns, Column } from 'bloomer';
import { fetchRooms } from '../../../../actions/meetingBookingActions'
import LModel from '../../../../services/api';
import { FETCH_MEETING_ROOMS, FETCH_MEETING_ROOMS_SUCCESS, FETCH_MEETING_ROOMS_ERROR } from '../../../../constants/actionContants';
import { URL } from '../../../../services/apiMiddleware';
import { useMeeting } from '../../../../providers/MeetingProvider';
import { useHistory } from '../../../../providers/HistoryProvider';

const numberSuper = {
  1: 'st',
  2: 'nd',
  3: 'rd',
}

export default props => {

  const {meetingState, fetchRooms, selectMeetingRoom} = useMeeting()
  const { history } = useHistory()
  
  const {loading, meetingRooms} = meetingState

  useEffect(() => {
    fetchRooms()
    console.log(meetingState)
  }, [])

  const selectAndNext = (meetingRoom) => {
    selectMeetingRoom(meetingRoom)
    history.push('/dashboard/event-meeting/meeting/add/detail')
  }

  return(
      <div style={{marginTop: '100px'}}>
      <Subtitle>Which room do you prefer?</Subtitle>
      {
        loading ?
        <span>Loading...</span>
        :
        <Columns isMultiline>
          {
            meetingRooms?  meetingRooms.map(meetingRoom => (
              <Column isSize='1/2' style={{cursor: 'pointer'}} onClick={() => selectAndNext(meetingRoom)}>
                <div style={{borderRadius: '5px', background: '#fff', margin: 0, padding: 0}} >
                  <div style={{background: '#ddd', width: '100%', height: '250px', backgroundImage: `url(${URL}Containers/event/download/${meetingRoom.picture})`, backgroundSize: '100%'}}/>
                  <h3 style={{textAlign: 'left', padding: '5px'}}>{meetingRoom.name}</h3>
                  <div style={{borderTop: '1px solid #ddd', borderBottom: '1px solid #dd', padding: '10px'}}>
                    {
                      meetingRoom.pricings ? meetingRoom.pricings.map(pricing => (
                        <div key={pricing.id} style={{display: 'flex', flexDirection: "row"}}>
                          <span>{pricing.name}</span>
                          <div style={{flex: 1, textAlign: 'right'}}>
                            <span style={{fontStyle: 'italic'}}>{`${(pricing.unitPrice*pricing.duration).toFixed(0)} Birr`}</span>
                          </div>
                        </div>
                      )) : <span style={{color: '#999'}}>No Pricings found</span>
                    }
                  </div>
                  <div style={{borderTop: '1px solid #ddd', display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
                    <div style={{flex: 1, textAlign:'center'}}>
                      <span style={{display: 'block'}}>{meetingRoom.seats}</span>
                      <span style={{display: 'block'}}>Seats</span>
                    </div>
                    <div style={{flex: 1, textAlign:'center'}}>
                      <span style={{display: 'block'}}>{`${meetingRoom.floor}${[1, 2, 3].includes(meetingRoom.floor) ? numberSuper[meetingRoom.floor] : 'th'}`}</span>
                      <span style={{display: 'block'}}>Seats</span>
                    </div>
                    <div style={{flex: 1, textAlign:'center'}}>
                      <span style={{display: 'block'}}>{meetingRoom.seats}</span>
                      <span style={{display: 'block'}}>Seats</span>
                    </div>
                  </div>
                </div>
              </Column>
            )) : null
          }
        </Columns>
      }
      </div>
  )
}
