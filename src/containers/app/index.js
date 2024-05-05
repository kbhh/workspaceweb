import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import MakeRouteWithSubRoutes from '../../components/routes/MakeRouteWithSubRoutes'

const App = ({route}) => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>
    {/* Side nav */}
    <main>
      {/* Breadcrumb  */}
      {/* Routes */}
    </main>
  </div>
)

export default App
