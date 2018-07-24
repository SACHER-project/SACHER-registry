import React from 'react'
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getAllRoleAssignments} from "../../actions/roleAssignmentAction";
import RoleAssignmentTable from './RoleAssignmentTable';
import {Link} from 'react-router-dom'
import Header from '../Header'


class RoleAssignmentPage extends Component {

    componentDidMount () {

        this.domainId = this.props.match.params["domainId"];

        this.loadProjectsFromServer(this.domainId)
    }


    loadProjectsFromServer(domainId) {
        this.props.getAllRoleAssignments(domainId);
    }


    render() {

            return (
                <div className="Home">
                    <Header/>
                    <br/>
                    <p>Role Assignment Page</p><Link className="Home" to={`/domains`}>Back to Domain Page</Link>
                    <br/>
                    <RoleAssignmentTable />
                </div>
            );

    }

}



const mapStateToProps = (state, ownProps) => {
    return {
        roleAssignmentState: state.domainStore.roleAssignmentState
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllRoleAssignments,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(RoleAssignmentPage);