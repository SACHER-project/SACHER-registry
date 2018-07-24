import React from "react";
import {connect} from "react-redux";
import ContainerContent from './ContainerContent'

class ContainerContentTable extends React.Component{
    render() {
        var rows = [];
        var project_name = this.props.project_name
        var container_name = this.props.container_name


        this.props.containerContent.forEach(function(content) {

            rows.push(<ContainerContent project_name={project_name} container_name={container_name}
                                            content={content}/>);

        });
        return (
            <table key="contentTable" className="table table-hover">
                <thead>
                <tr>
                    <th>Name</th><th>File Type</th><th>Bytes</th><th>Last Modified</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        containerContent: state.domainStore.containerContentState
    }
};




export default connect(mapStateToProps, null)(ContainerContentTable);