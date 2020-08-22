import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Navigation from './components/Navigation/Navigation'
import Landing from './components/Landing/Landing';

import * as ROUTES from './constants/routes'

const App = () => {
  return (  
    <div className="App">
      <header className="App-header">
        owo
      </header>
      <Router>
      <Navigation />  
      <hr />
      <Route path={ROUTES.LANDING} component={Landing} />
    </Router>
    </div>
  )
}

export default App
