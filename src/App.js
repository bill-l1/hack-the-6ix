import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Landing from './pages/Landing'
import Main from './pages/Main'
import CreateAccount from './pages/CreateAccount'
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
            render={() => <Main />}
          />
          <Route
            exact={true} 
            path='/create_account' 
            render={() => <CreateAccount />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default withFirebase(App)
