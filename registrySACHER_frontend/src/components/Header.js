import {connect} from "react-redux";
import React, { Component } from 'react';
import logo from '../images/sacher_logo.png';
import '../css/Home.css';

class Header extends Component {

    render() {
        return (
            <header className="Home-header">
                <img src={logo} className="Home-logo" alt="logo" />
                <h1 className="Home-title">SACHER Registry Management Service</h1>
            </header>
        );
    }
}

export default connect(null, null)(Header);
