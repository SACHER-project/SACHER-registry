import React from "react";
import {connect} from "react-redux";
import RoleAssignment from './RoleAssignment'

class RoleAssignmentTable extends React.Component{
    render() {
        var rows = [];

        this.props.roleAssignmentState.forEach(function(roleAssignment) {
            rows.push(<RoleAssignment roleAssignment={roleAssignment} />);
        });
        return (
            <table key="roleAssignmentTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Domain</th><th>User</th><th>Role</th><th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        roleAssignmentState: state.domainStore.roleAssignmentState

    }
};


const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssignmentTable);