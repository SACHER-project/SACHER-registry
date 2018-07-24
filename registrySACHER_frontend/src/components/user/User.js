import React from "react";
import {connect} from "react-redux";
import {deleteUser} from '../../actions/userLoginAction';
import UpdateUserDialog from './UpdateUserDialog'
import {bindActionCreators} from 'redux'


class User extends React.Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

    }


    handleDelete() {
        this.props.deleteUser(this.props.user);
    }


    render() {
        var userDeleteButton = (<button className="Home" onClick={this.handleDelete}>Delete</button>)
        var userUpdateButton = (<UpdateUserDialog user={this.props.user} />)

        return (
            <tr key={this.props.user.name}>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.role}</td>
                <td>{this.props.user.creation_time}</td>
                <td>
                    {this.props.role === 0 || this.props.role === 1 || this.props.role === 5 || this.props.role === 7 ? userDeleteButton : null}
                </td>
                <td>
                    {this.props.role === 0 || this.props.role === 1 || this.props.role === 5 ? userUpdateButton : null}
                </td>
            </tr>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        role: state.domainStore.role
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({
    deleteUser,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(User);