import { API_ROOT_URL } from './api-config';


class RoleAssignmentApi {

    static fetchAllRoleAssignments(domainId) {
        return fetch(`${API_ROOT_URL}roleassignment/` + domainId, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data["roleAssignments"]
            })
            .catch(error => {
                return error;
            });
    }

}

export default RoleAssignmentApi;