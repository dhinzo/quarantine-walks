import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'
import './NavLinks.css'

const NavLinks = props => {
    const auth = useContext(AuthContext)

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>ALL USERS</NavLink>
        </li>
        {auth.isLoggedIn && (
        <React.Fragment>
        <li>
            <NavLink to={`/${auth.userId}/walks`}>MY WALKS</NavLink>
        </li>        
        <li>
            <NavLink to="/walks/new">ADD WALK</NavLink>
        </li>
        </React.Fragment>
        )}
        {!auth.isLoggedIn && (
        <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>LOGOUT</button>
            </li>
        )}
    </ul>
}

export default NavLinks