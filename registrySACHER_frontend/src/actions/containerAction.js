import * as actionTypes from './actionTypes';
import ContainerApi from '../api/containerApi';

export const temp = [{"enabled": true, "description": "Owns users and projects created by heat", "name": "heat", "id": "29dd3148f3954d19bf3152e337ee9eb4"}, {"enabled": true, "description": "testDescription1", "name": "testName1", "id": "3318a3a67e7946c6a49e0191fcf9929d"}, {"enabled": true, "description": "tttttttttttttt", "name": "ttttttttttttt", "id": "350bb0188d9942faacfeeef9585e87c4"}, {"enabled": true, "description": "rwrwerwe", "name": "rwerwerw", "id": "3d3bdce49d124673b78fb1c9469e10e4"}, {"enabled": true, "description": "domainDescription", "name": "domainName", "id": "62f7117430a64d8780feb092be121772"}, {"enabled": true, "description": "", "name": "admin_domain", "id": "86bf0276cde34f3f9f659d82433415c2"}, {"enabled": true, "description": "Used for swift functional testing", "name": "swift_test", "id": "aa605379451a4b33820449b5a765556f"}, {"enabled": true, "description": "The default domain", "name": "Default", "id": "default"}, {"enabled": true, "description": "qqqqqqqqqq", "name": "qqqqqqqqqq", "id": "df76fad6bb234fc7a80c5eb241788300"}];



export function loadContainerSuccess(containers) {
    return {type: actionTypes.LOAD_CONTAINERS_SUCCESS, containers};
}

export const loadContainerError = (error) => ({
    type: actionTypes.LOAD_CONTAINERS_ERROR,
    error_msg: error,
})

export function getAllContainers(project_name){
    return dispatch => {
        return ContainerApi.fetchAllContainers(project_name)
            .then(containers => {dispatch(loadContainerSuccess(containers))})
            .catch(error => {loadContainerError(error)});
    }
}



export const containerReadEnableSuccess = (response) => ({
    type: actionTypes.CONTAINER_READ_ENABLE_SUCCESS,
    text: response.text,
});

export const containerReadEnableError = (error) => ({
    type: actionTypes.CONTAINER_READ_ENABLE_ERROR,
    msg : error,
});

export function containerReadEnable(project_name, container_name){
    return dispatch => {
        return ContainerApi.containerReadEnable(project_name, container_name)
            .then(response => dispatch(containerReadEnableSuccess(response)))
            .catch(error => dispatch(containerReadEnableError(error)));
    }
}


export const containerReadDisableSuccess = (response) => ({
    type: actionTypes.CONTAINER_READ_DISABLE_SUCCESS,
    text: response.text,
});

export const containerReadDisableError = (error) => ({
    type: actionTypes.CONTAINER_READ_DISABLE_ERROR,
    msg : error,
});

export function containerReadDisable(project_name, container_name){
    return dispatch => {
        return ContainerApi.containerReadDisable(project_name, container_name)
            .then(response => dispatch(containerReadDisableSuccess(response)))
            .catch(error => dispatch(containerReadDisableError(error)));
    }
}



export function uploadContentSuccess(containers) {
    return {type: actionTypes.UPLOAD_CONTENT_SUCCESS, containers};
}

export const uploadContentError = (error) => ({
    type: actionTypes.UPLOAD_CONTENT_ERROR,
    error_msg: error
})

export function uploadContent(project_name, container_name, file){
    return dispatch => {
        return ContainerApi.uploadContent(project_name, container_name, file)
            .then(msg => {dispatch(uploadContentSuccess(msg))})
            .catch(error => {uploadContentError(error)});
    }
}



export function downloadSuccess(msg) {
    return {type: actionTypes.DOWNLOAD_SUCCESS, msg};
}

export const downloadError = (error) => ({
    type: actionTypes.DOWNLOAD_ERROR,
    error_msg: error
})

export function download(project_name, container_name, content_name){
    return dispatch => {
        return ContainerApi.download(project_name, container_name, content_name)
            .then(msg => {dispatch(downloadSuccess(msg))})
            .catch(error => {downloadError(error)});
    }
}




export function showContainerContentSuccess(content) {
    return {type: actionTypes.CONTAINER_CONTENT_SUCCESS, content};
}

export const showContainerContentError = (error) => ({
    type: actionTypes.CONTAINER_CONTENT_ERROR,
    error_msg: error,
})

export function showContainerContent(project_name, container_name, folder_name){
    return dispatch => {
        return ContainerApi.showContainerContent(project_name, container_name, folder_name)
            .then(content => {dispatch(showContainerContentSuccess(content))})
            .catch(error => {showContainerContentError(error)});
    }
}




export function deleteContainerContentSuccess(msg) {
    return {type: actionTypes.DELETE_CONTAINER_CONTENT_SUCCESS, msg};
}

export function deleteContainerContentError(error) {
    return {
        type: actionTypes.DELETE_CONTAINER_CONTENT_ERROR,
        msg: error.message
    }
}

export function deleteContainerContent(project_name, container_name, object_name){
    return dispatch => {
        return ContainerApi.deleteContainerContent(project_name, container_name, object_name)
            .then(msg => {dispatch(deleteContainerContentSuccess(msg))})
            .catch(error => {deleteContainerContentError(error)});
    }
}

