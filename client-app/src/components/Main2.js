import React, { Component } from 'react';
import AuthService from './AuthService'
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import moment from 'moment';

class Main2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            Kanji: '',
            Words: [],
            jlpt: 0

        }
        this.handleChange = this.handleChange.bind(this)
        this.getKanji = this.getKanji.bind(this)



    }
    //only to tell on console if data was unmounted
    componentWillUnmount() {
        console.log('componentunMounted')
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    async getKanji() {

        let url = `https://kanjiapi.dev/v1/words/${this.state.search}?wordlimit=3`;
        //let url = `https://kanjiapi.dev/v1/kanji/grade-1`;

        let response = await fetch(url);
        let data = await response.json();
        //let num = Math.floor(Math.random() * (data.length - 0 + 1)) + 0;
        //console.log(data[num])

        console.log('response data:', data.slice(0, 4))
        console.log('response meanings:', data[0].meanings[0].glosses)
        //console.log(this.state.search)


        this.setState({
            Words: data

        });

    }

    render() {
        const { Words } = this.state;
        const wordSlice = Words.slice(0, 4);

        return (
            <div>
                <h1>Kanji Word Usage</h1>
                <br />
                <h2>Words: {wordSlice.map((word, i) =>
                    <div key={i}>
                        {word.meanings.map((mean, j) => <div key={j}> ~ Meanings: {mean.glosses} </div>)}
                        Variants: {word.variants.map((vari, j) => <div key={j}> ~ written: {vari.written} pronounced: {vari.pronounced}
                        </div>)}
                        <br /></div>)}
                </h2>
                <br />

                <br />
                {this.state.showSuccessMessage && <div>Update Success</div>}
                <div className="container">
                    Search: <input type="search" name="search" value={this.state.search} onChange={this.handleChange} />
                    <button className="btn btn-success mr-4" onClick={this.getKanji}>Search</button><span></span><span></span>
                    <br /><br /><br /><br />
                </div>
            </div>
        )
    }
}

export default Main2;