import React from "react";
import {connect} from "react-redux";
import User from './User'

class UserTable extends React.Component{
    render() {
        var rows = [];

        this.props.userState.forEach(function(user) {
            rows.push(<User user={user} />);
        });
        return (
            <table key="userTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Name</th><th>Email</th><th>Role</th><th>Creation Time</th><th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userState: state.domainStore.userState
    }
};


export default connect(mapStateToProps, null)(UserTable);