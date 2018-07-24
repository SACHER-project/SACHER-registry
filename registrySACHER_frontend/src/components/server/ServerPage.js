import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllServers} from '../../actions/serverAction';
import ServerTable from './ServerTable';
import {bindActionCreators} from "redux";
import BodyTitle from "../BodyTitle"
import Header from '../Header'



class ServerPage extends Component {


    componentDidMount () {

        this.props.getAllServers();
    }


    render() {
        return (
            <div className="Home">
                <Header/>
                <br/>
                <BodyTitle mainTitle="Server List"/>

                <br/>
                <ServerTable />
                <br/>


            </div>
        );
    }

}



// const mapStateToProps = (state, ownProps) => {
//     return {
//         serverState: state.domainStore.serverState
//     }
// };

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllServers,
    // createDomain,
}, dispatch);


export default connect(null, mapDispatchToProps)(ServerPage);

