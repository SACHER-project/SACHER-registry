import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../css/LoginPage.css";
import {userLogin} from '../actions/userLoginAction';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Header from './Header'



class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    // componentWillUpdate () {
    //     console.log("update" + this.props.login.toString());
    //     if(this.props.login == true)
    //         this.props.history.push('/home');
    // }

    componentWillReceiveProps(nextProps){
        if(nextProps.login === true)
            this.props.history.push('/home');
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("LOGIN LOGIN");
        var user = {};
        user['userName'] = this.state.username;
        user['password'] = this.state.password;

        this.props.userLogin(user);
    }


    render() {
        return (
            <div className="Home">
                <Header/>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username </ControlLabel>
                        <FormControl
                            autoFocus
                            // type="email"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password </ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <br/>
                    <Button className="Home" block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </form>
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


const mapDispatchToProps = dispatch => bindActionCreators({
    userLogin,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
