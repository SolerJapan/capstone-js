import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService.js';
import { withRouter } from 'react-router';

//this component pops up on top and displays the links based on if your logged in
class Header extends Component {
    render() {

        const isUserLoggedIn = AuthService.isUserLoggedIn();;
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">

                        <li><Link className="nav-link" to="/homepage">Home</Link></li>
                        {isUserLoggedIn && <li><Link className="nav-link" to="/edituser">Edit Profile</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/main">Kanji Translator</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/main2">Kanji Usage</Link></li>}
                    </ul>

                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/register">Register</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthService.logout}>Logout</Link></li>}

                    </ul>

                </nav>
            </header >

        )
    }
}

export default withRouter(Header);