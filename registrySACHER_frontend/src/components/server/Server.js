import React from "react";
import {connect} from "react-redux";
import {pauseServer, resumeServer} from '../../actions/serverAction';
import {bindActionCreators} from 'redux'


class Server extends React.Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleResume = this.handleResume.bind(this);

    }


    handleDelete() {
        this.props.pauseServer(this.props.server);
    }

    handleResume() {
        this.props.resumeServer(this.props.server);
    }


    render() {

        var serverPauseButton = (<button className="Home" onClick={this.handleDelete}>Pause</button>)
        var serverResumeButton = (<button className="Home" onClick={this.handleResume}>Resume</button>)

        return (
            <tr key={this.props.server.name}>
                <td>{this.props.server.name}</td>
                <td>{this.props.server.status}</td>
                <td>
                    {this.props.role === 0 || this.props.role === 5 ? serverPauseButton : null}
                </td>
                <td>
                    {this.props.role === 0 || this.props.role === 5 ? serverResumeButton : null}
                </td>
            </tr>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        role: state.domainStore.role
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({
    pauseServer,
    resumeServer
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Server);