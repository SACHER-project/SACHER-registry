import React from "react";
import {connect} from "react-redux";
import Modal from '../Modal.js'
import {updateUser} from "../../actions/userLoginAction";
const ReactDOM = require('react-dom');

class UpdateUserDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.render = this.render.bind(this);

        //this.attributesModel = ["domainname", "domaindescription", "domainenabled"];
        this.attributes = ["password", "email", "role"];
    }


    handleSubmit(e) {
        e.preventDefault();
        this.updatedUser = {};
        this.attributes.forEach(attribute => {
            this.updatedUser[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        if(this.updatedUser["password"] === "")
            window.alert("Inserire una password valida");
        else {
            this.props.updateUser(this.props.user, this.updatedUser);
            this.closeModal();
        }
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }


    render() {

        var inputs = (
            <p>
                <input type="text" defaultValue={this.props.user["name"]} ref="name" className="field" readOnly={true} /><br/>
                <input type="text" placeholder="Insert new password" ref="password" className="field"/><br/>
                <input type="text" defaultValue={this.props.user["email"]} ref="email" className="field"/><br/>
                <input type="text" defaultValue={this.props.user["role"]} ref="role" className="field"/><br/>
            </p>
        );

        return (
            <div key={this.props.user.name}>
                <button className="Home" onClick={() => this.openModal()}>Update</button>

                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>

                    <p><button className="Home" onClick={() => this.closeModal()}>Close</button></p>
                    <b>Update User</b>
                    <form>
                        {inputs}
                        <button className="Home" onClick={this.handleSubmit}>Update</button>
                    </form>

                </Modal>
            </div>
        )
    }

};



const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user,updatedUser) => dispatch(updateUser(user,updatedUser)),
    }
};


export default connect(null, mapDispatchToProps)(UpdateUserDialog);