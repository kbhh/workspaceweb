import React from 'react'
import { Route } from 'react-router-dom'
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { dashboardRoutes } from '../../routes';
import PrivateRoute from '../../components/PrivateRoute';
import { useDashboard, DashboardProvider } from "../../providers/DashboardProvider";
import { LocationProvider } from '../../providers/LocationProvider';
import { WorkspaceProvider } from '../../providers/WorkspaceProvider';
import { MeetingProvider } from '../../providers/MeetingProvider';

const DashboardLayoutWrapper = (props) => {
    const {state} = useDashboard()
    
    return (
        <DashboardLayout active="home" hasImage={state.hasImage} image={state.image} nomargin={true}>
            <div style={{marginTop: '20px', alignContent: 'center'}}>
            {
                dashboardRoutes.map((route, index) => 
                    route.private ? 
                            <PrivateRoute history={props.history} key={index} {...route} /> 
                        : 
                            <Route history={props.history} key={index} {...route} />
                    )
            }
            </div>
        </DashboardLayout>
    )
}

export default props => {
    return (
        <DashboardProvider>
            <LocationProvider>
                <WorkspaceProvider>
                    <MeetingProvider>
                        <DashboardLayoutWrapper {...props} />
                    </MeetingProvider>
                </WorkspaceProvider>
            </LocationProvider>
        </DashboardProvider>
    )
}