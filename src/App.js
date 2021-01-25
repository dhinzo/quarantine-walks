import React, { useState, useCallback} from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import MainNav from './shared/components/Navigation/MainNav'
import Users from './user/pages/Users'
import UserWalks from './walks/pages/UserWalks'
import NewWalk from './walks/pages/NewWalk'
import UpdateWalk from './walks/pages/UpdateWalk'
import Auth from './user/pages/Auth'
import { AuthContext } from './shared/context/auth-context'

const App = () => {
  // Pre-token auth
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // New TOKEN auth
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
  }, [])
  
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
  }, [])

  let routes

  if (token) {
    routes = (
      <Switch>
      <Route path="/" exact>
          <Users />
      </Route>
      <Route path="/:userId/walks" exact>
          <UserWalks />
      </Route>
      <Route path="/walks/new" exact>
          <NewWalk />
      </Route>
      <Route path="/walks/:walkId">
          <UpdateWalk />
      </Route>
      <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
      <Route path="/" exact>
          <Users />
      </Route>
      <Route path="/:userId/walks" exact>
          <UserWalks />
      </Route>
      <Route path='/auth'>
          <Auth />
      </Route>
      <Redirect to="/auth" />
      </Switch>
    )
  }
  

  return (
    <AuthContext.Provider value={{
      // double bang (!!) is both falsey and truthy
      isLoggedIn: !!token,
      token: token,
      userId: userId, 
      login: login, 
      logout: logout
      }}
    >
    <Router>
      <MainNav />
      <main>{routes}</main>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
