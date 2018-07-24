import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import DomainPage from './domain/DomainPage'
import ProjectPage from './domain/ProjectPage'
import RoleAssignmentPage from './domain/RoleAssignmentPage'
import UserPage from './user/UserPage'
import ServerPage from './server/ServerPage'
import ContainerPage_WebProject from './storage/ContainerPage_WebProject'
import ContainerPage_DataProcessing from './storage/ContainerPage_DataProcessing'
import ContainerContentPage from './storage/ContainerContentPage'
import LogoutPage from './LogoutPage'
import {connect} from "react-redux";


const App = () => (

    <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route path="/logout" component={LogoutPage} />
                    <PrivateRoute path="/home" component={HomePage} />
                    <PrivateRoute path="/domains" component={DomainPage} />
                    <PrivateRoute path="/projects/:domainId" component={ProjectPage} />
                    <PrivateRoute path="/roleassignments/:domainId" component={RoleAssignmentPage} />
                    <PrivateRoute path="/users" component={UserPage} />
                    <PrivateRoute path="/servers" component={ServerPage} />
                    <PrivateRoute path="/containers_webproject" component={ContainerPage_WebProject} />
                    <PrivateRoute path="/containers_dataprocessing" component={ContainerPage_DataProcessing} />
                    <PrivateRoute path="/containers_content/:names" component={ContainerContentPage} />

                </Switch>
            </div>
    </BrowserRouter>
)


export default connect(null, null)(App);
