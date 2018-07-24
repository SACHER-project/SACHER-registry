import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllUsers} from '../../actions/userLoginAction';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog'
import {bindActionCreators} from "redux";
import BodyTitle from "../BodyTitle"
import Header from '../Header'



class UserPage extends Component {

    // constructor(props) {
    //     super(props);
    // }


    componentDidMount () {
        this.props.getAllUsers();
    }


    render() {
        return (
            <div className="Home">
                <Header/>
                <br/>
                <BodyTitle mainTitle="User List"/>

                <br/>
                <div className="col-sm-1"><CreateUserDialog /></div>

                <br/>
                <UserTable />
            </div>
        );
    }

}



// const mapStateToProps = (state, ownProps) => {
//     return {
//         //mapping this.props.domainState = state.domainStore.domainState
//         domainState: state.domainStore.domainState
//     }
// };

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllUsers,   //questa funzione aggiorna lo stato
    // createDomain,
}, dispatch);


export default connect(null, mapDispatchToProps)(UserPage);