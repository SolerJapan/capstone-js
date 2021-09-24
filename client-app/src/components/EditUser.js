import React, { Component } from 'react';
import AuthService from './AuthService'
//import moment from 'moment';

//this links to the quiz database where questions 
//can be added or removed.
class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            token: '',
            message: null
        }
        //this.updateQuizClicked = this.updateQuizClicked.bind(this)
        //this.deleteQuizClicked = this.deleteQuizClicked.bind(this)

    }
    //only to tell on console if data was unmounted
    componentWillUnmount() {
        console.log('componentunMounted')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }
    //only to tell on console if data was mounted and refreshes data
    componentDidMount() {
        console.log('componentDidMount')
        //this.refresh();
        console.log(this.state)
    }


    render() {

        let username = AuthService.getLoggedInUserName()
        let id = AuthService.getLoggedInID()


        return <div>
            <h1>Edit Profile</h1>
            <h2>{this.state.id}</h2>
            <h2>{username}</h2>
            <h2>{id}</h2>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">

            </div>
        </div>
    }
}

export default EditUser;