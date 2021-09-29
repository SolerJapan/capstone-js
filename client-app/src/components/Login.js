import React, { Component } from 'react';
import AuthService from './AuthService';
//component to trigger the login and keep the state. there are various functions
//to login on base state, or with authentication takes the username and password.
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            token: '',

        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    //handles event 
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    //resets state 
    resetUserInputs = () => {
        this.setState({
            username: '',
            password: ''
        });
    };

    //responsible for logging in by managing states
    loginClicked() {


        AuthService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(this.state.username, this.state.password, response.data.token)
                AuthService.registerSuccessfulLoginForJwt(this.state.username, response.data.id, response.data.token);
                this.props.history.push(`/homepage`)
            }

            ).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        return (

            <div>
                <h1>Login</h1>
                <div className="container">
                    <br /><br />
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid User</div>}
                    {this.state.showSuccessMessage && <div>Success</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /><br /><br />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /><br /><br />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default Login