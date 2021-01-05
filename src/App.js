import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import MainNav from './shared/components/Navigation/MainNav'
import Users from './user/pages/Users'
import UserWalks from './walks/pages/UserWalks'
import NewWalk from './walks/pages/NewWalk'

const App = () => {
  return (
    <Router>
      <MainNav />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:id/walks" exact>
            <UserWalks />
          </Route>
          <Route path="/walks/new" exact>
            <NewWalk />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App;
