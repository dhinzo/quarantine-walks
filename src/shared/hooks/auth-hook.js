import { useState, useEffect, useCallback } from 'react'

let logoutTimer


export const useAuth = () => {
    // Pre-token auth
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [tokenExpiration, setTokenExpiration] = useState()

  // New TOKEN auth
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)

  

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    // stores token in localStorage. Stringify because LS only accepts text or numbers (to text)
    setTokenExpiration(tokenExpirationDate)
    localStorage.setItem(
      'userData', 
      JSON.stringify({ 
        userId: uid, 
        token: token, 
        expiration: tokenExpirationDate.toISOString() })
      )
  }, [])
  
  const logout = useCallback(() => {
    setToken(null)
    setTokenExpiration(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpiration) {
      // use getTime() to 
      const remainingTime = tokenExpiration.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpiration])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData && 
      storedData.token &&
      // checks if time/date of token is greater than the current time 
      new Date(storedData.expiration) > new Date()
      ) 
    {
      // look at the login function for these args
      login(storedData.userId, storedData.token)
    }
    // login() is the dependency for this useEffect()
  }, [login])

  return { token, login, logout, userId }

}