import { API_ROOT_URL } from './api-config';


class ProjectApi {

    static fetchAllProjects(domainId) {
        return fetch(`${API_ROOT_URL}projects/` + domainId, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data["projects"]
            })
            .catch(error => {
                return error;
            });
    }

}

export default ProjectApi;