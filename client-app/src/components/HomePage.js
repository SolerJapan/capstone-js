import React, { Component } from 'react';
import AuthService from './AuthService'

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLoginFailed: false,
            kanji: '',
            grade: '',
            username: '',

        }

    }

    async componentWillMount() {
        console.log('componentMounted')
        let username = AuthService.getLoggedInUserName()
        let data;
        //let kanji;
        console.log(username)
        if (username != '') {
            let url = `https://kanjiapi.dev/v1/kanji/grade-1`;
            let response = await fetch(url);
            data = await response.json();
            let num = Math.floor(Math.random() * (data.length - 0 + 1)) + 0;

            this.setState({
                hasLoginFailed: true,
                username: username,
                kanji: data[num]
            })

        }
    }


    render() {

        return (
            <div>
                <h1>Welcome {this.state.username}</h1>
                {this.state.hasLoginFailed && <br />}
                {this.state.hasLoginFailed && <br />}
                {this.state.hasLoginFailed && <br />}
                {this.state.hasLoginFailed && <h1>Kanji of the day is</h1>}
                {this.state.hasLoginFailed && <br />}
                {this.state.hasLoginFailed && <br />}
                {this.state.hasLoginFailed && <br />}
                {this.state.hasLoginFailed && <h1>{this.state.kanji}</h1>}
            </div>
        )

    }
}


export default HomePage;