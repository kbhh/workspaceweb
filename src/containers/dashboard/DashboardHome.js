import React from 'react'
import { Columns, Column, Icon } from 'bloomer';
import { RoundContainer } from '../../components/StyledComponents';
import { useDashboard } from '../../providers/DashboardProvider';
import landing from '../../assets/blueSpace-real.jpg'
import { useHistory } from '../../providers/HistoryProvider';

export default props => {
    const {state, setImage} = useDashboard()

    const {history} = useHistory()
    
    if(!state.hasImage && state.image !== landing)
        setImage(landing)

    return (
        <Columns isMobile isMultiline hasTextAlign="centered" style={{margin: '10px'}}>
                        <Column isSize="1/2">
                            <RoundContainer onClick={() => history.push('/dashboard/workspace')} margin background="#2691cf" cursor="pointer">
                                <Icon className="fa fa-network-wired" style={{color: '#fff', display: 'block', margin: '1px auto'}}/>
                                <strong style={{color: '#fff'}}>Book Workspace</strong>
                            </RoundContainer>
                        </Column>
                        <Column isSize="1/2" hasTextAlign="centered">
                            <RoundContainer margin background="#2691cf" cursor="pointer">
                                <Icon className="fa fa-map-marker-alt" style={{color: '#fff', display: 'block', margin: '1px auto'}}/>
                                <strong style={{color: '#fff'}}>View Locations </strong>
                            </RoundContainer>
                        </Column>
                        <Column isSize="1/2">
                                <RoundContainer margin background="#fff" cursor="pointer" onClick={() => history.push('/dashboard/event-meeting')}>
                                    <Icon className="fa fa-calendar-plus" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                                    <span style={{color: '#2691cf'}}>Events & Meetings </span>
                                </RoundContainer>
                        </Column>
                        <Column isSize="1/2">
                            <RoundContainer margin background="#fff" cursor="pointer">
                                <Icon className="fa fa-gift" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                                <span style={{color: '#2691cf'}}>More for U... </span>
                            </RoundContainer>
                        </Column>
                        <Column isSize="1/2">
                            <RoundContainer margin background="#fff" cursor="pointer">
                                <Icon className="fa fa-users" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                                <span style={{color: '#2691cf'}}>blueFace </span>
                            </RoundContainer>
                        </Column>
                        <Column isSize="1/2">
                            <RoundContainer margin background="#fff" cursor="pointer">
                                <Icon className="fa fa-comment" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                                <span style={{color: '#2691cf'}}>Community Board</span>
                            </RoundContainer>
                        </Column>
                        <Column isSize="1/2">
                            <RoundContainer margin background="#fff" cursor="pointer">
                                <Icon className="fa fa-headset" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                                <span style={{color: '#2691cf'}}>Support </span>
                            </RoundContainer>
                        </Column> 
                        <Column isSize="1/2">
                            <RoundContainer margin background="#fff" cursor="pointer">
                                <Icon className="fa fa-user" style={{color: '#2691cf', display: 'block', margin: '1px auto'}}/>
                                <span style={{color: '#2691cf'}}>My Account </span>
                            </RoundContainer>
                        </Column>                    
                    </Columns>
    )
}