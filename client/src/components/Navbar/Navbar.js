import classes from './Navbar.module.css';

import {NavLink} from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from '@wagmi/core';
import { useContext, useState } from 'react';

import { AppContext } from '../context/AddressContext';

const Navbar = () => {
    const [isAddress, setIsAddress] = useState(false);

    const {address} = useAccount();
    const ctx = useContext(AppContext);

    const {connect} = useConnect({
        connector: new InjectedConnector(),
    });

    const connectHandler = () => {
        setIsAddress(true);
    }
            if(address && isAddress)
            {   
                setIsAddress(false);
                ctx.sharedState.setAddress(address);
            }
        
    

    const activeStyle = {
        borderBottom: "2px solid white",
        color: "white"

    }

    return (
        <div className = {classes.navbar}>
            <div className = {classes.title}>
                <h1>D3VENT</h1>
            </div>
            <div className= {classes.options}>
                <NavLink to = "/" style={({isActive}) => isActive ? activeStyle : undefined}>
                    <h3>Home</h3>
                </NavLink>
                <NavLink to = "/your-events" style={({isActive}) => isActive ? activeStyle : undefined}>
                    <h3>Your Events</h3>
                </NavLink>
                <NavLink to = "/host" style={({isActive}) => isActive ? activeStyle : undefined}>
                    <h3>Host</h3>
                </NavLink>
            </div>
            <div onClick = {connectHandler}>
                <ConnectButton showBalance = {false} chainStatus = "icon"/>
            </div>
        </div>
    )
};

export default Navbar;