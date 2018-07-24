import {connect} from "react-redux";
import React from "react";
import {bindActionCreators} from "redux";




class RoleAssignment extends React.Component {

    render() {

        return (
            <tr key={this.props.roleAssignment.role_id}>
                <td>{this.props.roleAssignment.domain_id}</td>
                <td>{this.props.roleAssignment.user}</td>
                <td>{this.props.roleAssignment.role_name}</td>
            </tr>);
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        projectState: state.domainStore.roleAssignmentState
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(RoleAssignment);