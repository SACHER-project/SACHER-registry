import React from "react";
import {connect} from "react-redux";
import Server from './Server'

class ServerTable extends React.Component{
    render() {
        var rows = [];

        this.props.serverState.forEach(function(server) {
            rows.push(<Server server={server} />);
        });
        return (
            <table key="serverTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Server Name</th><th>Status</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        serverState: state.domainStore.serverState
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

export default connect(mapStateToProps, mapDispatchToProps)(ServerTable);