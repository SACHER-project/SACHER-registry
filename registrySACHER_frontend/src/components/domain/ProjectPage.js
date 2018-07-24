import React from 'react'
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getAllProjects} from "../../actions/projectAction";
import ProjectTable from './ProjectTable';
import {Link} from 'react-router-dom'
import Header from '../Header'


class ProjectPage extends Component {

    componentDidMount () {

        this.domainId = this.props.match.params["domainId"];

        this.loadProjectsFromServer(this.domainId)
    }


    loadProjectsFromServer(domainId) {
        this.props.getAllProjects(domainId);
    }


    render() {

            return (
                    <div className="Home">
                    <Header/>
                    <br/>
                    <p>Project Page</p><Link className="Home" to={`/domains`}>Back to Domain Page</Link>
                    <br/>
                    <ProjectTable />
            </div>

            );

    }

}



const mapStateToProps = (state, ownProps) => {
    return {
        projectState: state.domainStore.projectState
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({getAllProjects}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);