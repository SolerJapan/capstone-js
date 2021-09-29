import React, { Component } from 'react';
import AuthService from './AuthService';
import { Route, Redirect } from 'react-router-dom'

//checks if user is logged in and if so the option encased in this component become 
//available 
class AuthRoute extends Component {
    render() {
        if (AuthService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/Login" />
        }
    }
}

export default AuthRoute