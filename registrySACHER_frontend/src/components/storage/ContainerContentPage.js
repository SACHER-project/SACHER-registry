import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerContentTable from './ContainerContentTable';
import {bindActionCreators} from "redux";
import Header from '../Header'
import {showContainerContent} from "../../actions/containerAction";
import {Link} from 'react-router-dom'
import { hashHistory } from 'react-router';


class ContainerContentPage extends Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.indietro = this.indietro.bind(this);

        this.names = this.props.match.params["names"].split(',');

        this.state = {
            proj_name: this.names[0],
            container_name: this.names[1],
            folder_name: "null"
        }
    }

    componentDidMount() {
        this.initialState()
    }

    componentWillReceiveProps = (nextProps)=> {
        if (nextProps.location.key !== this.props.location.key) {
            this.updateState(nextProps.match.params["names"])
        }
    };

    initialState(){

        this.names = this.props.match.params["names"].split(',');

        if(this.names.length == 2) {

            this.state.proj_name = this.names[0]
            this.state.container_name = this.names[1]
            this.props.showContainerContent(this.state.proj_name, this.state.container_name, null);
        }
    }

    updateState(parameters){

        this.names = parameters.split(',');

        if(this.names.length == 3) {
            // if(this.state.proj_name != this.names[0] | this.state.container_name != this.names[1]
            //     | this.state.folder_name != this.names[2]) {
                this.state.folder_name = this.names[2]
                this.props.showContainerContent(this.state.proj_name, this.state.container_name, this.state.folder_name);
            // }
        }

        if(this.names.length == 2) {
            // if (this.state.proj_name != this.names[0] | this.state.container_name != this.names[1]) {
                this.state.proj_name = this.names[0]
                this.state.container_name = this.names[1]
                this.props.showContainerContent(this.state.proj_name, this.state.container_name, null);
            // }
        }
    }

    indietro(){
        this.props.history.goBack();
    }


    render() {
        return (
            <div className="Home">
                <Header/>
                <br/>
                <div className="Home">
                    <table>
                        <tr>
                            <td><h3>Container Content {this.state.container_name}</h3></td>
                            <td><button className="Home" onClick={this.indietro}>Go Back</button></td>
                            <td><Link className="Home" to={'/home'}>Home</Link></td>
                        </tr>
                    </table>
                </div>

                <br/>
                <ContainerContentTable project_name={this.state.proj_name} container_name={this.state.container_name}/>
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
    showContainerContent
}, dispatch);


export default connect(null, mapDispatchToProps)(ContainerContentPage);

