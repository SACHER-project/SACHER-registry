import React from "react";
import {connect} from "react-redux";
import Container from './Container'

class ContainerTable extends React.Component{
    render() {
        var rows = [];
        var project_name = this.props.project_name

        this.props.containerState.forEach(function(container) {
            rows.push(<Container project_name={project_name} container={container} />);
        });
        return (
            <table key="containerTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Container Name</th><th>Container Bytes</th><th>Creation date</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        containerState: state.domainStore.containerState
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        //deleteDomain: (domain) => dispatch(deleteDomain(domain)),
        //getAllDomains: () => dispatch(getAllDomains())

        //, {getAllDomains, deleteDomain}
        //createContact: contact => dispatch(contactAction.createContact(contact)),
        //deleteContact: index =>dispatch(contactAction.deleteContact(index))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerTable);