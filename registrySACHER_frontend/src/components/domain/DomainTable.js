import React from "react";
import {connect} from "react-redux";
import Domain from './Domain'

class DomainTable extends React.Component{
    render() {
        var rows = [];

        this.props.domainState.forEach(function(domain) {
            rows.push(<Domain domain={domain} />);
        });
        return (
            <table key="domainTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Domain Id</th><th>Name</th><th>Description</th><th>Enabled</th><th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        domainState: state.domainStore.domainState
    }
};


export default connect(mapStateToProps, null)(DomainTable);