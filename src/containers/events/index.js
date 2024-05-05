import React from 'react'
import { Route } from 'react-router-dom'
import { meetingRoutes } from '../../routes';
import PrivateRoute from '../../components/PrivateRoute';

export default props => (
    <div>
        {
            meetingRoutes.map((route, index) => (
                route.private ? 
                            <PrivateRoute history={props.history} key={index} {...route} /> 
                        : 
                            <Route history={props.history} key={index} {...route} />
                )
            )
        }
    </div>
)