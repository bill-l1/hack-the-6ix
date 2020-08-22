import React, { useState, useEffect, Component }  from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Landing from './pages/Landing'
import Main from './pages/Main'
import CreateAccount from './pages/CreateAccount'
import Profile from './pages/Profile'

import { withFirebase } from './components/Firebase'

// const PrivateRoute = ({component: Component, userAuth, firebase, ...rest}) => {
//   const authed = userAuth || firebase.auth().currentUser();
//   console.log("routeAuth:", userAuth);
//   console.log("routeAuth:", firebase.auth().currentUser());
//   return (
//     <Route
//     {...rest}
//       render={(props) => authed !== false
//         ? <Component {...props} />
//         : <Redirect to={{pathname: ROUTES.LANDING, state: {from: props.location}}} />}
//     />
//   )
// }

const App = ({firebase}) => {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
      firebase.auth.onAuthStateChanged(user => {
          user ? setUserAuth(user) : setUserAuth(null)
      })
  }, [userAuth])

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
          <Route
            exact={true} 
            path={ROUTES.CREATEACCOUNT}
            component={CreateAccount}
          />
          <Route
            exact={true} 
            path={ROUTES.PROFILE}
            component={Profile}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default withFirebase(App)
