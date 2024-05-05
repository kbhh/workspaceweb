import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { AppProvider } from './providers/AppPrivider';
import { HistoryProvider } from './providers/HistoryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { routes } from "./routes";
import PrivateRoute from "./components/PrivateRoute";

const history = createBrowserHistory()

const App = () => {
  return (
    <AppProvider>
      <HistoryProvider history={history}>
        <AuthProvider>
          <Router history={history}>
            <Switch>
                {
                  routes.map((route, index) => 
                    route.private ? <PrivateRoute key={index} {...route} /> : <Route key={index} {...route} />
                  )
                }
            </Switch>
          </Router>
        </AuthProvider>
      </HistoryProvider>
    </AppProvider>
  );
}

export default App