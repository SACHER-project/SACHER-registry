import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {containerReadDisable, containerReadEnable} from "../../actions/containerAction";
import {Link} from 'react-router-dom'
import FileUpload from './FileUpload'

class Container extends React.Component{

    constructor(props) {
        super(props);
        this.handleContainerReadEnable = this.handleContainerReadEnable.bind(this);
        this.handleContainerReadDisable = this.handleContainerReadDisable.bind(this);
    }


    handleContainerReadEnable() {
        this.props.containerReadEnable(this.props.project_name, this.props.container.name);
    }

    handleContainerReadDisable() {
        this.props.containerReadDisable(this.props.project_name, this.props.container.name);
    }


    handleshowContainerContent() {
        this.props.showContainerContent(this.props.project_name, this.props.container.name);
    }



    render() {

        var names = []
        names[0] = this.props.project_name
        names[1] = this.props.container.name

        var containerReadEnableButton=(<button className="Home" onClick={this.handleContainerReadEnable}>Read Enable</button>)
        var containerReadDisableButton=(<button className="Home" onClick={this.handleContainerReadDisable}>Read Disable</button>)
        var showContainerContent=(<Link className="Home" to={`/containers_content/${names}`}>Show Content</Link>)
        var uploadButton=(<FileUpload project_name={this.props.project_name} container_name={this.props.container.name}/>)

        return (
            <tr key={this.props.container.name}>
                <td>{this.props.container.name}</td>
                <td>{this.props.container.bytes}</td>
                <td>{this.props.container.last_modified}</td>
                <td>
                    {this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3 || this.props.role === 4 || this.props.role === 7 ? containerReadEnableButton : null}
                </td>
                <td>
                    {this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3 || this.props.role === 4 || this.props.role === 7 ? containerReadDisableButton : null}
                </td>
                <td>
                    {this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3  || this.props.role === 7 ? uploadButton : null}
                </td>
                <td>
                    {this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3 || this.props.role === 4 || this.props.role === 7 ? showContainerContent : null}
                </td>

            </tr>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        role: state.domainStore.role
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({
    containerReadEnable,
    containerReadDisable,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Container);