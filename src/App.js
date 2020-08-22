import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import * as ROUTES from './constants/routes'

import Landing from './pages/Landing'
import Main from './pages/Main'

import { withFirebase } from './components/Firebase'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact={true} 
            path={ROUTES.LANDING}
            component={Landing}
          />
          <Route
            exact={true} 
            path={ROUTES.MAIN}
            component={Main}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default withFirebase(App)
