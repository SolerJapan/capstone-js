import React, { Component } from 'react';

//import AuthenticationService from './AuthenticationService';
import axios from 'axios';
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

    resetUserInputs = () => {
        this.setState({
            username: '',
            password: ''
        });
    };

    loginClicked() {
        console.log(this.state.username)
        console.log(this.state.password)

        const payload = {
            username: this.state.username,
            password: this.state.password
        };
        //use axios to make post request 
        //const URL = `http://localhost:9999/v1/user-items/auth/login`;
        axios({
            url: 'http://localhost:9999/v1/user-items/auth/login',
            method: 'POST',
            data: payload
        })
            .then((jwt) => {
                console.log('logged in successfully');
                console.log(jwt);
                this.resetUserInputs();
                //this.getBlogPost();
                window.localStorage.setItem("token", jwt);
                //this.props.history.push("/");
            })
            .catch(() => {
                console.log('login failed');
                this.props.history.push("/register");
            });

        /*  axios
            .post(URL)
            .then(jwt => {
                console.log(jwt)

                this.setState({ hasLoginFailed: false });
                // save jwt to localstorage or top-level react component state
            })
            .catch(e => {
                console.log(e)
                this.setState({ hasLoginFailed: true });
                // set login successful to false
                // do stuff
            }); */



    }

    render() {
        return (

            <div>
                <h1>Login</h1>
                <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid User</div>}
                    {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                    {this.state.showSuccessMessage && <div>Success</div>}
                    UserName: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default Login