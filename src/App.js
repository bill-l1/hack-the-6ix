import React, { useState, useEffect, Component }  from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Landing from './pages/Landing'
import Main from './pages/Main'
import CreateAccount from './pages/CreateAccount'
import Profile from './pages/Profile'

import { withFirebase } from './components/Firebase'

const CondRoute = ({component: Component, redirectTo, condition, ...rest}) => {
  return (
    <Route
    {...rest}
      render={(props) => condition
        ? <Component {...props} />
        : <Redirect to={redirectTo} />}
    />
  )
}

const App = ({firebase}) => {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
      firebase.auth.onAuthStateChanged(user => {
          user ? setUserAuth(user) : setUserAuth(null)
          if(user) console.log(firebase.getUser());
      })
  }, [userAuth])

  return (
    <Router>
      <div className="App">
        <Switch>
          <CondRoute
            exact={true} 
            path={ROUTES.LANDING}
            component={Landing}
            redirectTo={ROUTES.MAIN}
            condition={userAuth == null}
          />
          <CondRoute
            exact={true} 
            path={ROUTES.MAIN}
            component={Main}
            redirectTo={ROUTES.LANDING}
            condition={userAuth != null}
          />
          <Route
            exact={true} 
            path={ROUTES.CREATEACCOUNT}
            component={CreateAccount}
          />
          <CondRoute
            exact={true} 
            path={ROUTES.PROFILE}
            component={Profile}
            redirectTo={ROUTES.LANDING}
            condition={userAuth != null}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default withFirebase(App)
