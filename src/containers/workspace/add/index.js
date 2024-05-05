import React, { useEffect, useState } from 'react'
import {Subtitle, Section, Container } from 'bloomer';
import { API_BASE_URL } from '../../../constants/apiConstants';
import { Link } from 'react-router-dom'
import { useLocation } from '../../../providers/LocationProvider';
import { useHistory } from '../../../providers/HistoryProvider';

export default props => {

  const { locationState, fetchLocations, selectLocation } = useLocation()
  const [loading] = useState(locationState.loading)
  const {history} = useHistory()
  
  const { locations } = locationState

  const [locationFetched, setLocationFetched] = useState(false)
    // componentDidMount(){
      // if(selectedLocation) {
      //   changeForm('location', selectedLocation) 
      //   next()
      // } else {
      //   fetchLocations()
      // }
    // }

    useEffect(() => {
      if(!locationFetched){
        fetchLocations()
        setLocationFetched(true)
      }
    }, [locationFetched, setLocationFetched, fetchLocations])

    const next = () => {
      history.push('/dashboard/workspace/add/desk')
    }

    return (
        <div>
                <Subtitle>Which site do you prefer?</Subtitle>
                <p style={{padding: '10px', fontSize: '14px'}}>We have different centers and flexible options for different needs with the principle of Space4Everyone, from global corporates to local startups, with the aim of creating the best possible work experience, to enhance your productivity and your quality of life.</p>
                {
                  loading ?
                  <span>Loading...</span>
                  :
                  <Section isPaddingless>
                    {
                      locations.map(location => (
                        <Link key={location.id} onClick={() => {selectLocation(location.id); next()}}>
                          <Container isFluid style={{display: 'flex', flexDirection: 'row', textAlign: 'start', background: '#fff', margin: '10px auto', cursor: 'pointer'}}>
                          <Container isFluid isMarginless isPaddingless style={{flex: 2, background: '#ddd', backgroundImage: `url(${API_BASE_URL}Containers/location/download/${location.profileImage})`, backgroundSize: 'cover'}}>
                            {/* <img src={`${API_BASE_URL}Containers/location/download/${location.profileImage}`} alt={location.name}/> */}
                          </Container>
                          <Container isFluid style={{flex: 6, padding: '5px'}}>
                            <h2>{location.name}</h2>
                            <span style={{display: 'block', color: '#999', fontSize: '12px'}}>{location.address}</span>
                            <div style={{padding: '5px'}}>
                              <em>Email</em> <span style={{color: '#999'}}>{location.email}</span><br />
                              <em>Phone</em> <span style={{color: '#999'}}>{location.phone}</span>
                            </div>
                          </Container>
                        </Container>
                        </Link>
                      ))
                    }
                  </Section>
                }
        </div>
    )
}