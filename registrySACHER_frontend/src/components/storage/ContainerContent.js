import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {download, deleteContainerContent} from "../../actions/containerAction";
import {Link} from 'react-router-dom'
import FileUpload from './FileUpload'

class ContainerContent extends React.Component{

    constructor(props) {
        super(props);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDownload() {
        let contentName = this.props.content.name.replace(/\//g, '*')
        this.props.download(this.props.project_name, this.props.container_name, contentName);
    }

    handleDelete(){
        let contentName = this.props.content.name.replace(/\//g, '*')
        this.props.deleteContainerContent(this.props.project_name, this.props.container_name, contentName);
    }

    render() {

        if(this.props.content.hasOwnProperty('subdir')){

            var names = []
            names[0] = this.props.project_name
            names[1] = this.props.container_name
            names[2] = this.props.content.subdir.replace(/\//g, '*')
            var uploadFolder = names[1] + "*" + names[2]
            var showContainerContent=(<Link className="Home" to={`/containers_content/${names}`}>Show Content</Link>)
            var uploadButton=(<FileUpload project_name={this.props.project_name} container_name={uploadFolder}/>)

            return (
                <tr key={this.props.content.subdir}>
                    <td>{this.props.content.subdir}</td>
                    <td>{showContainerContent}</td>
                    <td>
                        {this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3  || this.props.role === 7 ? uploadButton : null}
                    </td>
                </tr>);

        } else {

            var downloadButton=(<button className="Home" onClick={this.handleDownload}>Download</button>)
            var deleteButton= (<button className="Home" onClick={this.handleDelete}>Delete</button>)

            return (
                <tr key={this.props.content.name}>
                    <td>{this.props.content.name}</td>
                    <td>{this.props.content.content_type}</td>
                    <td>{this.props.content.bytes}</td>
                    <td>{this.props.content.last_modified}</td>

                    <td>
                        {this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3 || this.props.role === 4 || this.props.role === 7 || this.props.role === 8 ? downloadButton : null}
                    </td>
                    <td>
                        {this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3 || this.props.role === 5 || this.props.role === 7 ? deleteButton : null}
                    </td>

                </tr>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        role: state.domainStore.role
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({
    download,
    deleteContainerContent
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ContainerContent);