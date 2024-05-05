import React from 'react'
// import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { Container } from 'bloomer/lib/layout/Container';
import { RoundContainer } from '../../components/StyledComponents';
import { Subtitle, Icon } from 'bloomer';
// import { Link } from 'react-router-dom'

export default props => (
    <Container isFluid style={{textAlign: 'center', marginTop: '100px', padding: '10px'}}>
        <Subtitle>Workspace that fits your needs.</Subtitle> 
        <p style={{color: '#555'}}>blueSpace offers a premier workspace experience, whether you need a pass for a day, a dedicated desk for your business, or an office suite for your entire company.</p>
        <p style={{color: '#555'}}>We provide furnished and fully serviced workspaces with flexible options along with meeting rooms and event spaces, and lifestyle amenities that make life a little better, every day.</p>
        <p style={{color: '#555'}}>Why put off living while you work?</p>
        <RoundContainer background="#fff" cursor="pointer" onClick={() => props.history.push('/dashboard/workspace/add')}>
            <Icon className="fa fa-plus" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
            <span style={{display: 'block', fontSize: '24px'}}>Book Workspace</span>
        </RoundContainer>
        <RoundContainer background="#fff" cursor="pointer" onClick={() => props.history.push('/dashboard/workspace/list')}>
            <Icon className="fa fa-calendar-alt" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
            <span  style={{display: 'block', fontSize: '24px'}} >My Bookings</span>
        </RoundContainer>
    </Container>
)