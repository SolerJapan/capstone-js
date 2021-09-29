import React, { Component, Redirect } from 'react';
import { API_URL } from '../Constants';
import AuthService from './AuthService';
import axios from 'axios';
//component to trigger the login and keep the state. there are various functions
//to login on base state, or with authentication takes the username and password.
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            showSuccessMessage: true,
            showRegisteredMessage: false,
            posts: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
    }
    //handles event 
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    resetUserInputs = () => {
        this.setState({
            username: '',
            password: ''
        });
    };

    registerClicked() {
        console.log(this.state.username)
        console.log(this.state.password)

        const payload = {
            username: this.state.username,
            password: this.state.password
        };
        //use axios to make post request 
        //const URL = `http://localhost:9999/v1/user-items/auth/login`;
        axios({
            url: API_URL,
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('registered successfully');
                this.resetUserInputs();
                this.setState({ isRegistered: true })

            })
            .catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ isRegistered: false })
            });


    }

    render() {
        //if true return redirect
        return (

            <div>
                <h1>Register</h1>
                <div className="container">
                    <br /><br />
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                    {!this.state.showSuccessMessage && <div className="alert alert-warning">User Exists or bad connection</div>}
                    {this.state.isRegistered && <div className="alert alert-warning">User registered successfully</div>}
                    {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /><br /><br />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /><br /><br />

                    <button className="btn btn-success" onClick={this.registerClicked}>Register</button>
                </div>
            </div>
        )
    }
}

export default Register