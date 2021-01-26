import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import MainNav from './shared/components/Navigation/MainNav'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'
// import Users from './user/pages/Users'
// import UserWalks from './walks/pages/UserWalks'
// import NewWalk from './walks/pages/NewWalk'
// import UpdateWalk from './walks/pages/UpdateWalk'
// import Auth from './user/pages/Auth'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'


// Splitting code
const Users = React.lazy(() => import('./user/pages/Users'))
const UserWalks = React.lazy(() => import('./walks/pages/UserWalks'))
const NewWalk = React.lazy(() => import('./walks/pages/NewWalk'))
const UpdateWalk = React.lazy(() => import('./walks/pages/UpdateWalk'))
const Auth = React.lazy(() => import('./user/pages/Auth'))


const App = () => {

  const { token, login, logout, userId } = useAuth()

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
      <main><Suspense fallback={
      <div className="center">
      <LoadingSpinner />
      </div>
      }
      >
      {routes}</Suspense></main>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
