import React, { Component } from 'react';

//this component pops up on the bottom of all pages
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-primary">all rights reserved </span>
            </footer>
        )
    }
}

export default Footer;