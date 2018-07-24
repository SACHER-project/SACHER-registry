import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";


const PrivateRoute = ({ component: Component, login: login, ...rest }) => (
    <Route {...rest} render={(props) => (
        login === true ? <Component {...props} /> : <Redirect to={{pathname: '/'}} />
    )} />
)



const mapStateToProps = (state, ownProps) => {
    return {
        domainState: state.domainStore.domainState,
        login: state.domainStore.login
    }
};

export default connect(mapStateToProps)(PrivateRoute);