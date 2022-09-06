import classes from './Navbar.module.css';

import {Link} from "react-router-dom";


import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
    return (
        <div className = {classes.navbar}>
            <div className = {classes.title}>
                <h1>D3VENT</h1>
            </div>
            <div className= {classes.options}>
                <Link to = "/">
                    <h3>Home</h3>
                </Link>
                <Link to = "/your-events">
                    <h3>Your Events</h3>
                </Link>
                <Link to = "/host">
                    <h3>Host</h3>
                </Link>
            </div>
            <div>
                <ConnectButton showBalance = {false} chainStatus = "icon"/>
            </div>
        </div>
    )
};

export default Navbar;