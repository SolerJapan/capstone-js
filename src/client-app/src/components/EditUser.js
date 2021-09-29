import React, { Component } from 'react';
import AuthService from './AuthService'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import moment from 'moment';

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            username: '',
            password: '',
            hasUpdateFailed: null,
            showSuccessMessage: false,
            token: '',
            message: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateClicked = this.updateClicked.bind(this)
        this.deleteClicked = this.deleteClicked.bind(this)
        this.submit = this.submit.bind(this)




    }
    //only to tell on console if data was unmounted
    componentWillUnmount() {
        console.log('componentunMounted')
    }

    submit() {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteClicked,
                },
                {
                    label: 'No',
                    onClick: () => alert('Canceled')
                }
            ]
        });
    };


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    updateClicked() {
        let username = AuthService.getLoggedInUserName()
        let id = AuthService.getLoggedInID()

        AuthService
            .executeJwtUpdateService(username, this.state.password, id)
            .then((response) => {
                console.log(this.state.username, this.state.password, id)
                this.setState({ showSuccessMessage: true })
            }

            ).catch(() => {
                this.setState({ showSuccessMessage: false })

            })
    }

    deleteClicked() {
        console.log('delete')
        let id = AuthService.getLoggedInID()

        AuthService
            .executeJwtDeleteService(id)
        AuthService.logout()
        window.location.reload(false);
    }



    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }


    render() {

        let username = AuthService.getLoggedInUserName()
        let id = AuthService.getLoggedInID()


        return (
            <div>
                <h1>Edit Profile</h1>
                <h2>{this.state.id}</h2>
                <h3>User: {username}</h3>
                <br />
                {this.state.showSuccessMessage && <div>Update Success</div>}
                <div className="container">
                    New Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <br /><br />
                    <button className="btn btn-success mr-4" onClick={this.updateClicked}>Update</button><span></span><span></span>
                    <button className="btn btn-danger" onClick={this.submit}>Delete</button>
                </div>
            </div>
        )
    }
}

export default EditUser;