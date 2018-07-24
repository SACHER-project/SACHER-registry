import React from "react";
import {uploadContent} from "../../actions/containerAction";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import Modal from '../Modal.js'

class FileUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            file:null,
            isModalOpen: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }


    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit

        this.props.uploadContent(this.props.project_name, this.props.container_name, this.state.file );
    }


    openModal() {
        this.setState({isModalOpen: true})
    }

    closeModal() {
        this.setState({isModalOpen: false})
    }


    render() {

        return (
            <div className="Home">
                <button className="Home" onClick={() => this.openModal()}>Upload</button>

                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>

                    <p><button className="Home" onClick={() => this.closeModal()}>Close</button></p>
                    <b>File Upload</b>
                    <br/>
                    <form className="Home" onSubmit={this.onFormSubmit}>
                        <input type="file" onChange={this.onChange} />
                        <button className="Home" type="submit">Upload</button>
                    </form>

                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    uploadContent,
}, dispatch);

export default connect(null, mapDispatchToProps)(FileUpload);