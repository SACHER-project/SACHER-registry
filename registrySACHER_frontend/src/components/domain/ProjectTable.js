import React from "react";
import {connect} from "react-redux";
import Project from './Project'

class ProjectTable extends React.Component{
    render() {
        var rows = [];

        this.props.projectState.forEach(function(project) {
            rows.push(<Project project={project} />);
        });
        return (
            <table key="projectTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Domain Id</th><th>Project Id</th><th>Project Name</th><th>Links</th><th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        projectState: state.domainStore.projectState

    }
};


export default connect(mapStateToProps, null)(ProjectTable);