import * as actionTypes from '../actions/actionTypes';
import React from 'react'


const defaultState = {
    domainState: [],
    userState: [],
    roleServicesState: [],
    projectState: [],
    roleAssignmentState:[],
    login: false,
    role: null,
    role_name: null,
    serverState: [],
    containerState: [],
    containerContentState: []
}


export default (state=defaultState, action={}) => {


    switch (action.type) {

        case actionTypes.LOAD_DOMAINS_SUCCESS:
            return {
                ...state,
                domainState: action.domains
            }

        case actionTypes.LOAD_DOMAINS_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }


        case actionTypes.GET_ROLE_SERVICES_SUCCESS:
            return {
                ...state,
                roleServicesState: action.services
            }

        case actionTypes.GET_ROLE_SERVICES_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }


        case actionTypes.LOAD_PROJECTS_SUCCESS:
            return {
                ...state,
                projectState: action.projects
            }

        case actionTypes.LOAD_PROJECTS_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }



        case actionTypes.LOAD_ROLE_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                roleAssignmentState: action.roleAssignments
            }

        case actionTypes.LOAD_ROLE_ASSIGNMENTS_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }



        case actionTypes.DELETE_DOMAIN_SUCCESS:
            window.alert(action.msg);
            return {
                ...state,
                domainState: state.domainState.filter(domain => domain.id !== action.domain.id),
            };


        case actionTypes.DELETE_DOMAIN_ERROR:
            window.alert('Alert title: \n'+ action.msg);
            return {
                ...state,
                //domainState: action.domains
            }


        case actionTypes.CREATE_DOMAIN_SUCCESS:
            window.alert('The Domain was created successfully! \n You can reach it at http://137.204.57.17/dashboard/auth/login/');
            return {
                ...state,
                domainState: [...state.domainState, action.response.domain]
            }


        case actionTypes.CREATE_DOMAIN_ERROR:
            window.alert('Alert title: \n'+ action.msg);
            return {
                ...state,
            }




        case actionTypes.UPDATE_DOMAIN_SUCCESS:
            return {...state, domainState: state.domainState.map( (domain) => {
                if(domain.id !== action.response.domain.id) {
                    // This isn't the item we care about - keep it as-is
                    return domain;
                }

                // Otherwise, this is the one we want - return an updated value
                return {
                    ...domain,
                    ...action.response.domain
                };
            })}



        case actionTypes.UPDATE_DOMAIN_ERROR:
            window.alert('Alert title: \n'+ action.msg);
            return {
                ...state,
            }


        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                login: true,
                role: action.response.role,
                role_name: action.response.role_name
            }

        case actionTypes.LOGIN_ERROR:
            window.alert('Username o password errati! \n'+ action.error);
            return {
                login: false,
                ...state,
            }


        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                login: false,
            }


        case actionTypes.LOAD_USERS_SUCCESS:
            return {
                ...state,
                userState: action.users
            }

        case actionTypes.LOAD_USERS_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }


        case actionTypes.UPDATE_USER_SUCCESS:
            return {...state, userState: state.userState.map( (user) => {
                    if(user.name !== action.response.user.name) {
                        // This isn't the item we care about - keep it as-is
                        return user;
                    }

                    // Otherwise, this is the one we want - return an updated value
                    return {
                        ...user,
                        ...action.response.user
                    }
                })}


        case actionTypes.UPDATE_USER_ERROR:
            window.alert('Alert title: \n'+ action.msg);
            return {
                ...state,
            }



        case actionTypes.CREATE_USER_SUCCESS:
            window.alert('The User was created successfully!');
            return {
                ...state,
                userState: [...state.userState, action.response]
            }


        case actionTypes.CREATE_USER_ERROR:
            window.alert('Alert title: \n'+ action.msg);
            return {
                ...state,
            }


        case actionTypes.DELETE_USER_SUCCESS:
            window.alert(action.msg);
            return {
                ...state,
                userState: state.userState.filter(user => user.name !== action.user.name),
            };


        case actionTypes.DELETE_USER_ERROR:
            window.alert('Alert title: \n'+ action.msg);
            return {
                ...state,
            }


        case actionTypes.LOAD_SERVERS_SUCCESS:
            return {
                ...state,
                serverState: action.servers
            }

        case actionTypes.LOAD_SERVERS_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }


        case actionTypes.PAUSE_SERVER_SUCCESS:
            if (action.res == "fail"){
                window.alert('Something went wrong! \n');
                return {...state}
            } else {
                window.alert('Paused! \n');
                return {
                    ...state, serverState: state.serverState.map(
                        function (server) {
                            if (server.name == action.server.name) {
                                var modServer = server
                                modServer.status = "PAUSED";
                                return {...server, ...modServer}
                            }

                            return server;
                        }
                    )
                }
            }

        case actionTypes.PAUSE_SERVER_ERROR:
            window.alert('Something went wrong! \n');
            return {
                ...state,
            }


        case actionTypes.RESUME_SERVER_SUCCESS:
            if (action.res == "fail"){
                window.alert('Something went wrong! \n');
                return {...state}
            } else {
                window.alert('Resumed! \n');
                return {
                    ...state,
                    serverState: state.serverState.map(
                        function (server) {
                            if (server.name == action.server.name) {
                                var modServer = server
                                modServer.status = "ACTIVE";
                                return {...server, ...modServer}
                            }

                            return server;
                        }
                    ),
                }
            }

        case actionTypes.RESUME_SERVER_ERROR:
            window.alert('Something went wrong! \n');
            return {
                ...state,
            }


        case actionTypes.LOAD_CONTAINERS_SUCCESS:
            return {
                ...state,
                containerState: action.containers
            }

        case actionTypes.LOAD_CONTAINERS_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }




        case actionTypes.CONTAINER_READ_ENABLE_SUCCESS:
            window.alert('CONTAINER_READ_ENABLE_SUCCESS \n'+ action.text);
            return {
                ...state,
            }

        case actionTypes.CONTAINER_READ_ENABLE_ERROR:
            window.alert('CONTAINER_READ_ENABLE_ERROR \n'+ action.msg);
            return {
                ...state,
            }

        case actionTypes.CONTAINER_READ_DISABLE_SUCCESS:
            window.alert('CONTAINER_READ_DISABLE_SUCCESS \n'+ action.text);
            return {
                ...state,
            }

        case actionTypes.CONTAINER_READ_DISABLE_ERROR:
            window.alert('CONTAINER_READ_DISABLE_ERROR \n'+ action.msg);
            return {
                ...state,
            }


        case actionTypes.CONTAINER_CONTENT_SUCCESS:
            return {
                ...state,
                containerContentState: action.content
            }

        case actionTypes.CONTAINER_CONTENT_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }


        case actionTypes.DOWNLOAD_SUCCESS:
            return {
                ...state,
                // containerContent: action.content
            }

        case actionTypes.DOWNLOAD_ERROR:
            window.alert('Alert title: \n'+ action.error_msg);
            return {
                ...state,
            }


        case actionTypes.UPLOAD_CONTENT_SUCCESS:
            window.alert('File updated successfully!\n')
            return {
                ...state,
            }

        case actionTypes.UPLOAD_CONTENT_ERROR:
            window.alert('Something went wrong!\n');
            return {
                ...state,
            }

        case actionTypes.DELETE_CONTAINER_CONTENT_SUCCESS:
            window.alert(action.msg);
            return {
                ...state,
                containerContentState: state.containerContentState.filter(
                    function(containerContent){
                        if(containerContent.hasOwnProperty('name')){
                            if(containerContent.name != action.msg.objectName) {
                                return containerContent;
                            }
                        }
                        else return containerContent;
                    }
                ),
            };


        case actionTypes.DELETE_CONTAINER_CONTENT_ERROR:
            window.alert('Alert title: \n'+ action.msg);
            return {
                ...state,
            }


        default:
            return state;

    }
}
