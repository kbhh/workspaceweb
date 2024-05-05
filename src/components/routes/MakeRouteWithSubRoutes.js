import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../../services/authService';

const MakeRouteWithSubRoutes = route => (
    <Route
        path={route.path}
        otherProps={route.otherProps}
        render={props => {
            if(route.redirect)
                return <Redirect to={route.redirect} state={{from: props.location}} />
            if(route.private && AuthService.is_logged_in())
                return <route.component {...props} title={route.title} routes={route.routes ? route.routes : []} />
            if(route.private && !AuthService.is_logged_in())
                return <Redirect to='/auth/login' state={{from: props.location}} />
            else
                return <route.component {...props} title={route.title} routes={route.routes ? route.routes : []} />
        }
        }
    />
)

export default MakeRouteWithSubRoutes