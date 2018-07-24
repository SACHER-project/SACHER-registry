import React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {fetchUserServices, getAllUsers} from "../actions/userLoginAction";
import {bindActionCreators} from "redux";
import '../css/Home.css';
import Header from './Header'



class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount () {
        this.props.fetchUserServices(this.props.role);
    }



    render() {
        var rows = [];

        var domain = (<Link className="Home" to={'/domains'}>Domains Management</Link>);
        var user = (<Link className="Home" to={'/users'}>Users Management</Link>);
        var server = (<Link className="Home" to={'/servers'}>Server Management</Link>);
        var container_webproject = (<Link className="Home" to={'/containers_webproject'}>Container WebProject Management</Link>);
        var container_dataprocessing = (<Link className="Home" to={'/containers_dataprocessing'}>Container DataProcessing Management</Link>);


        // this.props.roleServicesState.forEach(function(service) {
        //     rows.push({service});
        // });

        return (
            <div className="Home">
                <Header/>
                <br/>
                <div className="Home">
                    <table>
                        <tr>
                            <td><h3>HomePage</h3></td>
                            <td><Link className="Home" to={'/logout'}>Logout</Link></td>
                        </tr>
                    </table>
                </div>

                {/*<Grid>*/}
                    {/*<Row>*/}
                        {/*<Col xs={12} md={8}>HELLO</Col>*/}
                        {/*<Col xs={6}  md={4}>HELLO</Col>*/}
                    {/*</Row>*/}
                {/*</Grid>*/}
                {/*<br/>*/}
                {/*<div className="row">*/}
                    {/*<div className="col-4">.col-4</div>*/}
                    {/*<div className="col-4">.col-4</div>*/}
                    {/*<div className="col-4">.col-4</div>*/}
                {/*</div>*/}

                {/*<br/>*/}
                {/*<div className="row">*/}
                    {/*<h3 className="col-sm-3">Homepage</h3>*/}
                    {/*<Link className="col-sm-9" to={'/logout'}>Logout</Link>*/}
                {/*</div>*/}

                <p>Logged Role: {this.props.role_name} ({this.props.role})</p>
                <br/>

                {/*<div>TEST</div>*/}
                {/*{this.props.roleServicesState.map(service => <div>{service}</div>)}*/}
                {/*/!*<div>{rows}</div>*!/*/}
                {/*<div>TEST</div>*/}

                <div>{this.props.role === 0 ? domain : null}</div>
                <br/>
                <div>{this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3 || this.props.role === 5 || this.props.role === 7 ? user : null}</div>
                <br/>
                <div>{this.props.role === 0 || this.props.role === 5 || this.props.role === 6 ? server : null}</div>
                <br/>
                <div>{this.props.role === 0 || this.props.role === 1 || this.props.role === 2 || this.props.role === 3 || this.props.role === 4 ? container_webproject : null}</div>
                <br/>
                <div>{this.props.role === 0 || this.props.role === 7 || this.props.role === 8? container_dataprocessing : null}</div>

            </div>
        );
    }
};



const mapStateToProps = (state, ownProps) => {
    return {
        domainState: state.domainStore.domainState,
        login: state.domainStore.login,
        role: state.domainStore.role,
        role_name: state.domainStore.role_name,
        roleServicesState: state.domainStore.roleServicesState
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUserServices,
    getAllUsers
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
