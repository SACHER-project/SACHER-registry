import {connect} from "react-redux";
import React from "react";
import {bindActionCreators} from "redux";




class Project extends React.Component {

    render() {

        return (
            <tr key={this.props.project.id}>
                <td>{this.props.project.domain_id}</td>
                <td>{this.props.project.id}</td>
                <td>{this.props.project.name}</td>
            </tr>);
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        projectState: state.domainStore.projectState
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Project);