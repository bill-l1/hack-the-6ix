import React from 'react'
import LandingPage from './pages/LandingPage/LandingPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact={true} 
            path='/' 
            render={() => <LandingPage />}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
