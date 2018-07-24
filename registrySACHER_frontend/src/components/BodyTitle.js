import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'




class BodyTitle extends Component {


    render() {
        return (

            <div className="Home">
                <table>
                    <tr>
                        <td><h3>{this.props.mainTitle}</h3></td>
                        <td><Link className="Home" to={'/home'}>Back to HomePage</Link></td>
                    </tr>
                </table>
            </div>
        );
    }

}

export default connect(null, null)(BodyTitle);