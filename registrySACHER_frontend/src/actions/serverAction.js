import * as actionTypes from './actionTypes';
import ServerApi from '../api/serverApi';

export const temp = [{"enabled": true, "description": "Owns users and projects created by heat", "name": "heat", "id": "29dd3148f3954d19bf3152e337ee9eb4"}, {"enabled": true, "description": "testDescription1", "name": "testName1", "id": "3318a3a67e7946c6a49e0191fcf9929d"}, {"enabled": true, "description": "tttttttttttttt", "name": "ttttttttttttt", "id": "350bb0188d9942faacfeeef9585e87c4"}, {"enabled": true, "description": "rwrwerwe", "name": "rwerwerw", "id": "3d3bdce49d124673b78fb1c9469e10e4"}, {"enabled": true, "description": "domainDescription", "name": "domainName", "id": "62f7117430a64d8780feb092be121772"}, {"enabled": true, "description": "", "name": "admin_domain", "id": "86bf0276cde34f3f9f659d82433415c2"}, {"enabled": true, "description": "Used for swift functional testing", "name": "swift_test", "id": "aa605379451a4b33820449b5a765556f"}, {"enabled": true, "description": "The default domain", "name": "Default", "id": "default"}, {"enabled": true, "description": "qqqqqqqqqq", "name": "qqqqqqqqqq", "id": "df76fad6bb234fc7a80c5eb241788300"}];



export function loadServerSuccess(servers) {
    return {type: actionTypes.LOAD_SERVERS_SUCCESS, servers};
}

export const loadServerError = (error) => ({
    type: actionTypes.LOAD_SERVERS_ERROR,
    error_msg: error,
})

export function getAllServers(){
    return dispatch => {
        return ServerApi.fetchAllServers()
            .then(servers => {dispatch(loadServerSuccess(servers))})
            .catch(error => {loadServerError(error)});
    }
}



export const pauseServerSuccess = (response, server) => ({
    type: actionTypes.PAUSE_SERVER_SUCCESS,
    res: response.res,
    server: server
});

export const pauseServerError = (error) => ({
    type: actionTypes.PAUSE_SERVER_ERROR,
    msg : error,
});

export function pauseServer(server){
    return dispatch => {
        return ServerApi.pauseServer(server)
            .then(response => dispatch(pauseServerSuccess(response, server)))
            .catch(error => dispatch(pauseServerError(error)));
    }
}


export const resumeServerSuccess = (response, server) => ({
    type: actionTypes.RESUME_SERVER_SUCCESS,
    res: response.res,
    server: server
});

export const resumeServerError = (error) => ({
    type: actionTypes.RESUME_SERVER_ERROR,
    msg : error,
});

export function resumeServer(server){
    return dispatch => {
        return ServerApi.resumeServer(server)
            .then(response => dispatch(resumeServerSuccess(response, server)))
            .catch(error => dispatch(resumeServerError(error)));
    }
}
