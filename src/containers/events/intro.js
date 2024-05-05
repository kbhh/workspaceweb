import React from 'react'
import { Container } from 'bloomer/lib/layout/Container';
import { RoundContainer } from '../../components/StyledComponents';
import { Subtitle, Columns, Column, Icon } from 'bloomer';
import { Link } from 'react-router-dom'

// import eventImage from '../../assets/event.jpg'

const EventIntro = props => (    
    <Container isFluid style={{textAlign: 'center', padding: '10px', marginBottom: '100px'}}>
        <Subtitle>Host Events in Style.</Subtitle> 
        <p style={{color: '#555', fontSize: '12px'}}>Whether you need a company off-site retreat for 5, a seated workshop for 50, a catered 
                reception for 200, an art show or product launch, or anything in between, we offer inspiring
                unique spaces and customized event planning, from the right lighting, branding, décor, floral,
                 AV, and catering, with meticulous attention to every detail.</p>
        <Columns isMobile isMarginless isPaddingless>
            <Column isSize="1/2" isMarginless>
                <Link to='/tour'>
                    <RoundContainer background="#fff" margin={true} cursor="pointer" onClick={() => console.log(' toour ')}>
                        <Icon className="fa fa-plus" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                        <span style={{display: 'block', fontSize: '12px'}}>Book A Tour</span>
                    </RoundContainer>
                </Link>        
            </Column>
            <Column isSize="1/2" isMarginless>
                <Link to='/dashboard/event-meeting/meeting/add'>
                    <RoundContainer background="#fff" margin={true} cursor="pointer" onClick={() => props.history.push('/workspace/list')}>
                        <Icon className="fa fa-users" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                        <span  style={{display: 'block', fontSize: '12px'}} >Book A Meeting Room</span>
                    </RoundContainer>
                </Link>
            </Column>
        </Columns>
        <Link to='/workspace/list'>
            <RoundContainer background="#fff" cursor="pointer" onClick={() => props.history.push('/workspace/list')}>
                <Icon className="fa fa-calendar-plus" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                <span  style={{display: 'block', fontSize: '12px'}} >Book An Event</span>
            </RoundContainer>
        </Link>
        <Link to='/workspace/list'>
            <RoundContainer background="#2691cf" cursor="pointer" onClick={() => props.history.push('/workspace/list')}>
                <span  style={{display: 'block', fontSize: '12px', color: '#fff'}} >My Bookings</span>
            </RoundContainer>
        </Link>
    </Container>
)

export default EventIntro
