import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import AuthenticationService from './AuthenticationService.js';
import { withRouter } from 'react-router';

//this component pops up on top and displays the links based on if your logged in
class Header extends Component {
    render() {

        const isUserLoggedIn = false;
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div></div>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/register">Register</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" >Logout</Link></li>}
                        {/* onClick={AuthenticationService.logout} */}
                    </ul>

                </nav>
            </header>

        )
    }
}

export default withRouter(Header);