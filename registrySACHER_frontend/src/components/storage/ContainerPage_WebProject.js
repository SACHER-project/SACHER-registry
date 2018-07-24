import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllContainers} from '../../actions/containerAction';
import ContainerTable from './ContainerTable';
import {bindActionCreators} from "redux";
import BodyTitle from "../BodyTitle"
import Header from '../Header'




class ContainerPage extends Component {

    // constructor(props) {
    //     super(props);
    // }


    componentDidMount() {
        this.props.getAllContainers("webAppModenaProject");
    }


    render() {
        return (
            <div className="Home">
                <Header/>
                <br/>
                <BodyTitle mainTitle="Container WebApp List"/>

                <br/>
                <ContainerTable project_name='webAppModenaProject' />
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
    getAllContainers
}, dispatch);


export default connect(null, mapDispatchToProps)(ContainerPage);

