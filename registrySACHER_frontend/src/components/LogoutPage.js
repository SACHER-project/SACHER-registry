import React, { Component } from "react";
import "../css/LoginPage.css";
import {userLogout} from '../actions/userLoginAction';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import Header from './Header'


class LogoutPage extends Component {

    constructor(props) {
        super(props);
        this.props.userLogout()
    }


    render() {
        return (

            <div className="Home">
                <Header/>
                <br/>
                <p> You are logged out of SACHER Registry</p>
                <br/>
                <Link className="Home" to={`/`}>Login Page</Link>
            </div>
        );
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        domainState: state.domainStore.domainState,
        login: state.domainStore.login
    }
};


const mapDispatchToProps = dispatch => ({
    userLogout: message => dispatch({ type: 'LOGOUT_SUCCESS' })
})


export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);