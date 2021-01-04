import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from './user/pages/Users'
import NewWalk from './walks/pages/NewWalk'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/walks/new" exact>
          <NewWalk />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App;
