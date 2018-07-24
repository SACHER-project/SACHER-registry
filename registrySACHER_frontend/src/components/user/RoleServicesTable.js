import React from "react";
import {connect} from "react-redux";
import RoleServices from './RoleServices'

class UserTable extends React.Component{
    render() {
        var rows = [];

        this.props.userState.forEach(function(roleServices) {
            rows.push(<RoleServices roleServices={roleServices} />);
        });
        return (
            <table key="userTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Role</th><th>Services</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userState: state.domainStore.userState,
        roleServices: state.domainStore.roleServicesState
    }
};


export default connect(mapStateToProps, null)(UserTable);