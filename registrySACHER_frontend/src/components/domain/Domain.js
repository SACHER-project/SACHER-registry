import React from "react";
import {connect} from "react-redux";
import {deleteDomain} from '../../actions/domainAction';
import UpdateDomainDialog from './UpdateDomainDialog'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'


class Domain extends React.Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

    }


    handleDelete() {
        this.onDelete(this.props.domain);
    }

    onDelete(domain){
        this.props.deleteDomain(domain);
    }


    onUpdate(domain, updatedDomain) {
        this.props.updateDomain(domain, updatedDomain);
    }


    render() {

        return (
            <tr key={this.props.domain.id}>
                <td>{this.props.domain.id}</td>
                <td>{this.props.domain.name}</td>
                <td>{this.props.domain.description}</td>
                <td>{this.props.domain.enabled + ''}</td>
                <td>
                    <button className="Home" onClick={this.handleDelete}>Delete</button>
                </td>
                <td>
                    {<UpdateDomainDialog domain={this.props.domain} />}
                </td>
                <td>
                    <Link className="Home" to={`/projects/${this.props.domain.id}`}>Show Apps/Projects</Link>
                </td>
                <td>
                    <Link className="Home" to={`/roleassignments/${this.props.domain.id}`}>Show Role Assignments</Link>
                </td>
            </tr>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        domainState: state.domainStore.domainState
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({
    deleteDomain,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Domain);