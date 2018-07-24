import React from "react";
import {connect} from "react-redux";
import Modal from '../Modal.js'
import {createUser} from "../../actions/userLoginAction";
const ReactDOM = require('react-dom');

class CreateUserDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isModalOpen: false}
        this.handleSubmit = this.handleSubmit.bind(this);

        this.attributes = ["username", "password", "email", "role"];
    }

    handleSubmit(e) {
        e.preventDefault();
        var newUser = {};
        this.attributes.forEach(attribute => {
            newUser[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        this.props.createUser(newUser);

        // clear out the dialog's inputs
        this.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        this.closeModal();
    }

    openModal() {
        this.setState({isModalOpen: true})
    }

    closeModal() {
        this.setState({isModalOpen: false})
    }

    render() {
        var inputs = this.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
            </p>
        );

        return (
            <div>
                <button className="Home" onClick={() => this.openModal()}>Create</button>

                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <p><button className="Home" onClick={() => this.closeModal()}>Close</button></p>
                    <b>Create new domain</b>
                    <form>
                        {inputs}
                        <button className="Home" onClick={this.handleSubmit}>Create</button>
                    </form>
                </Modal>
            </div>
        )
    }

}


// const mapStateToProps = (state, ownProps) => {
//     return {
//         //mapping this.props.domainState = state.domainStore.domainState
//         domainState: state.domainStore.domainState
//     }
// };


const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user) => dispatch(createUser(user)),
    }
};


export default connect(null, mapDispatchToProps)(CreateUserDialog);