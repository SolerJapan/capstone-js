import React, { Component } from 'react';
import { KANJI_API_URL_WORDS } from '../Constants';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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

    //retrieves kanji meanings and variants
    async getKanji() {

        let url = `${KANJI_API_URL_WORDS}${this.state.search}?wordlimit=3`;

        let response = await fetch(url);
        let data = await response.json();

        console.log('response data:', data.slice(0, 4))
        console.log('response meanings:', data[0].meanings[0].glosses)


        this.setState({
            Words: data

        });

    }

    render() {
        const { Words } = this.state;
        const wordSlice = Words.slice(0, 4);
        // outputs results if kanji found
        return (
            <div>
                <h1>Kanji Word Usage</h1>
                <br />
                <h2>
                    <br />
                    {wordSlice.map((word, i) =>
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