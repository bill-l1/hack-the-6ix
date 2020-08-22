import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Main from './pages/Main'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact={true} 
            path='/' 
            render={() => <Landing />}
          />
          <Route
            exact={true} 
            path='/main' 
            render={() => <Main />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App
