import classes from './Navbar.module.css'

import { NavLink } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { AppContext } from '../context/AddressContext'
import Button from '../UI/Button'

const Navbar = () => {
  const ctx = useContext(AppContext)

<<<<<<< HEAD
  const accountAddress = ctx.sharedState.accountAddress
  const isConnected = ctx.sharedState.isConnected

  const connectHandler = () => {
    ctx.sharedState.connectWalletHandler()
  }
=======
    const connectHandler = () => { 
        ctx.sharedState.connectWalletHandler();
    };
>>>>>>> b12bb6d1c7467d12b1c213f06b3464769eaf1160

  const activeStyle = {
    borderBottom: '2px solid white',
    color: 'white',
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.title}>
        <img className='logo' src='logod3.png' />
      </div>
      <div className={classes.options}>
        <NavLink
          to='/'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <h3>Home</h3>
        </NavLink>
        <NavLink
          to='/your-events'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <h3>Your Events</h3>
        </NavLink>
        <NavLink
          to='/host'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <h3>Host</h3>
        </NavLink>
        <NavLink
          to='/about'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <h3>About</h3>
        </NavLink>
      </div>
      <div>
<<<<<<< HEAD
        <Button
          classes={`btn-secondary ${classes.connectBtn}`}
          onClick={isConnected ? '' : { connectHandler }}
        >
          {isConnected
            ? `${accountAddress.substring(0, 4)}...${accountAddress.substring(
                38,
                42
              )}`
            : 'Connect Wallet'}
        </Button>
=======
        <Button classes = {`btn-secondary ${classes.connectBtn}`} onClick = {!isConnected && connectHandler}>{isConnected ? `${accountAddress.substring(0,4)}...${accountAddress.substring(38,42)}` : 'Connect Wallet'}</Button>
>>>>>>> b12bb6d1c7467d12b1c213f06b3464769eaf1160
      </div>
    </div>
  )
}

export default Navbar
