import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllDomains, createDomain} from '../../actions/domainAction';
import DomainTable from './DomainTable';
import CreateDomainDialog from './CreateDomainDialog'
import {bindActionCreators} from "redux";
import BodyTitle from "../BodyTitle"
import Header from '../Header'



class DomainPage extends Component {

    constructor(props) {

        super(props);

        console.log("DOMAINS VARIABLE INITIALIZATION\n");

    }


    componentDidMount () {
        this.loadDomainsFromServer()
    }


    loadDomainsFromServer() {

        console.log("LOAD_DOMAINS_FROM_SERVER");

        this.props.getAllDomains();

    }



    render() {
        return (
            <div className="Home">
                <Header/>
                <br/>
                <BodyTitle mainTitle="Domain List"/>

                <br/>
                <div className="col-sm-1"><CreateDomainDialog /></div>

                <br/>
                <DomainTable />
            </div>
        );
    }

}



const mapStateToProps = (state, ownProps) => {
    return {
        //mapping this.props.domainState = state.domainStore.domainState
        domainState: state.domainStore.domainState
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllDomains,
    createDomain,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(DomainPage);

