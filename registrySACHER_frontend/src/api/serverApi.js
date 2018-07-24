import { API_ROOT_URL } from './api-config';

class ServerApi {


    static fetchAllServers() {
        return fetch(`${API_ROOT_URL}servers`, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            // .then(function (data) {
            //     return data["domains"]
            // })
            .catch(error => {
                return error;
            });
    }

    static pauseServer(server) {
        return fetch(`${API_ROOT_URL}serverpause/`+ server.name, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error;
            });
    }

    static resumeServer(server) {
        return fetch(`${API_ROOT_URL}serverresume/`+ server.name, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .catch(error => {
                return error;
            });
    }


}

export default ServerApi;