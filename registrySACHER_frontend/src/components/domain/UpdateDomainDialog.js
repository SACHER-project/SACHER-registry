import React from "react";
import {connect} from "react-redux";
import Modal from '../Modal.js'
import {updateDomain} from "../../actions/domainAction";
const ReactDOM = require('react-dom');

class UpdateDomainDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.render = this.render.bind(this);

        //this.attributesModel = ["domainname", "domaindescription", "domainenabled"];
        this.attributes = ["name", "description", "enabled"];
    }


    handleSubmit(e) {
        e.preventDefault();
        this.updatedDomain = {};
        this.attributes.forEach(attribute => {
            this.updatedDomain["domain" + attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        this.props.updateDomain(this.props.domain, this.updatedDomain);
        this.closeModal();
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }


    render() {

        var inputs = this.attributes.map(attribute =>
            <p>
                <input type="text" placeholder={this.props.domain[attribute]} //cambiare attribute con i nomi del this.props.domain
                       defaultValue={this.props.domain[attribute]}             // e cioe' name description etc
                       ref={attribute} className="field" />
            </p>
        );

        return (
            <div key={this.props.domain.URL}>
                <button className="Home" onClick={() => this.openModal()}>Update</button>

                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>

                    <p><button className="Home" onClick={() => this.closeModal()}>Close</button></p>
                    <b>Update Domain</b>
                    <form>
                        {inputs}
                        <button className="Home" onClick={this.handleSubmit}>Update</button>
                    </form>

                </Modal>
            </div>
        )
    }

};


const mapStateToProps = (state, ownProps) => {
    return {
        //mapping this.props.domainState = state.domainStore.domainState
        domainState: state.domainStore.domainState
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        updateDomain: (domain,updatedDomain) => dispatch(updateDomain(domain,updatedDomain)),
        //createDomain: (domain) => dispatch(createDomain(domain)),

        //getAllDomains: () => dispatch(getAllDomains())

        //, {getAllDomains, deleteDomain}
        //createContact: contact => dispatch(contactAction.createContact(contact)),
        //deleteContact: index =>dispatch(contactAction.deleteContact(index))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateDomainDialog);