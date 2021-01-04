import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'
import './MainNav.css'

const MainNav = props => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const openDrawer = () => {
        setDrawerOpen(true)
    }

    const closeDrawer = () => {
        setDrawerOpen(false)
    }


    return (
    <React.Fragment>
        {drawerOpen && <Backdrop onClick={closeDrawer} />}
        { drawerOpen && (
            <SideDrawer>
                <nav className="main-nav__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
        )}
        <MainHeader>
            <button className="main-nav__menu-btn" onClick={openDrawer} >
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-nav__title">
                <Link to="/">Quarantine Walks</Link>
            </h1>
            <nav className="main-nav__header-nav">
                <NavLinks />
            </nav>  
        </MainHeader>
    </React.Fragment>
    )
}

export default MainNav