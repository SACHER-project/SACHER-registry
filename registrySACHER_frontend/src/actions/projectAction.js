import * as actionTypes from './actionTypes';
import ProjectApi from '../api/projectApi';



export function loadProjectSuccess(projects) {
    return {type: actionTypes.LOAD_PROJECTS_SUCCESS, projects};
}

export const loadProjectError = (error) => ({
    type: actionTypes.LOAD_PROJECTS_ERROR,
    error_msg: error,
})

export function getAllProjects(domainId){
    return dispatch => {
        return ProjectApi.fetchAllProjects(domainId)
            .then(projects => {dispatch(loadProjectSuccess(projects))})
            .catch(error => {loadProjectError(error)});
    }
}


