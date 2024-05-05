import React from 'react'
import { Route } from 'react-router-dom'
import { workspaceRoutes } from '../../routes'
import PrivateRoute from '../../components/PrivateRoute';
import { useDashboard } from '../../providers/DashboardProvider';
import { TOGGLE_HAS_IMAGE } from '../../constants/actionContants';

export default props => {
    const {state, dispatch} = useDashboard()
    
    if(state.hasImage){
        console.log('worksace', state)
        dispatch({
            type: TOGGLE_HAS_IMAGE,
            hasImage: false,
            image: null
        })
    }
    
    return (
        <div>
            {
                workspaceRoutes.map((route, index) => 
                    route.private ? <PrivateRoute key={index} {...route} /> : <Route key={index} {...route} />
                )
            }
        </div>
    )
}