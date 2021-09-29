import React, { Component } from 'react';
import { KANJI_API_URL } from '../Constants';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import moment from 'moment';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            kanji: '',
            grade: '',
            stroke_count: '',
            meanings: [],
            kun_readings: [],
            on_readings: [],
            name_readings: [],
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
    //searches for the kanji character
    async getKanji() {

        let url = `${KANJI_API_URL}${this.state.search}`;
        let response = await fetch(url);
        let data = await response.json();
        //console.log(data[num])
        //console.log(data)
        //console.log(this.state.search)


        this.setState({
            kanji: data.kanji,
            grade: data.grade,
            stroke_count: data.stroke_count,
            meanings: data.meanings,
            kun_readings: data.kun_readings,
            on_readings: data.on_readings,
            name_readings: data.name_readings,
            jlpt: data.jlpt

        });

    }

    render() {
        let { meanings } = this.state;
        let { kun_readings } = this.state;
        let { on_readings } = this.state;
        let { name_readings } = this.state;

        //displays the full kanji information once found
        return (
            <div>
                <h1>Kanji Translator</h1>
                <h2>kanji: {this.state.kanji}</h2>
                <br />
                <h2>grade: {this.state.grade}</h2>
                <br />
                <h2>stroke count: {this.state.stroke_count}</h2>
                <br />
                <h2>meanings: {meanings.map((x, i) => <data key={i}> {x} | </data>)}</h2>
                <br />
                <h2>kun readings: {kun_readings.map((x, i) => <data key={i}> {x} | </data>)}</h2>
                <br />
                <h2>on readings: {on_readings.map((x, i) => <data key={i}> {x}  | </data>)}</h2>
                <br />
                <h2>name readings: {name_readings.map((x, i) => <data key={i}> {x} | </data>)}</h2>
                <br />
                <h2>jlpt Level: {this.state.jlpt}</h2>
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

export default Main;