import React from "react";
import {connect} from "react-redux";
import {deleteUser} from '../../actions/userLoginAction';
import UpdateUserDialog from './UpdateUserDialog'
import {bindActionCreators} from 'redux'


class User extends React.Component{

    constructor(props) {
        super(props);
        // this.handleDelete = this.handleDelete.bind(this);

    }


    // handleDelete() {
    //     this.props.deleteUser(this.props.user);
    // }


    // onUpdate(domain, updatedDomain) {
    //     this.props.updateDomain(domain, updatedDomain);
    // }


    render() {
        return (
            <tr key={this.props.user.role}>
                <td>{this.props.user.role}</td>
                <td>{this.props.user.services}</td>
                {/*<td>*/}
                    {/*<button className="btn btn-info" onClick={this.handleDelete}>Delete</button>*/}
                {/*</td>*/}
                {/*<td>*/}
                    {/*{<UpdateUserDialog user={this.props.user} />}*/}
                {/*</td>*/}
            </tr>);
    }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         domainState: state.domainStore.domainState
//     }
// };


const mapDispatchToProps = dispatch => bindActionCreators({
    // deleteUser,
}, dispatch);


export default connect(null, mapDispatchToProps)(User);