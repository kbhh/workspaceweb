import React from 'react'
import { Route } from 'react-router-dom'
import { useCheckedSetTitle } from '../../providers/AppPrivider';
import { homeRoutes } from '../../routes'
import PrivateRoute from '../../components/PrivateRoute';

const Home = props => {
  
  // set page title - Home
  useCheckedSetTitle('Home')

  return (
    <div>
      {
        homeRoutes.map((route, index) => 
          route.private ? <PrivateRoute key={index} {...route} /> : <Route key={index} {...route} />
        )
      }
    </div>
  )
}

export default Home