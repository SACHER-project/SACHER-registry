import * as actionTypes from './actionTypes';
import RoleAssignmentApi from '../api/roleAssignmentApi';



export function loadRoleAssignmentSuccess(roleAssignments) {
    return {type: actionTypes.LOAD_ROLE_ASSIGNMENTS_SUCCESS, roleAssignments};
}

export const loadRoleAssignmentError = (error) => ({
    type: actionTypes.LOAD_ROLE_ASSIGNMENTS_ERROR,
    error_msg: error,
})

export function getAllRoleAssignments(domainId){
    return dispatch => {
        return RoleAssignmentApi.fetchAllRoleAssignments(domainId)
            .then(roleAssignments => {dispatch(loadRoleAssignmentSuccess(roleAssignments))})
            .catch(error => {loadRoleAssignmentError(error)});
    }
}