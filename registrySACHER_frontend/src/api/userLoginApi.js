import { API_ROOT_URL } from './api-config';

class userLoginApi {

    static userLogin(user){
        console.info("USER:" + user)
        return fetch(`${API_ROOT_URL}loginRegistry`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        })
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw(error);
            });
    }


    static fetchAllUsers() {
        return fetch(`${API_ROOT_URL}users`, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data
            })
            .catch(error => {
                return error;
            });
    }

    static deleteUser(user) {
        return fetch(`${API_ROOT_URL}user/` + user.name, {method: 'DELETE'})
            .then(response => {
                return response.json();
            })
            .catch(function(error){
                throw(error);
            });
    }


    static updateUser(user, updatedUser) {
        return fetch(`${API_ROOT_URL}user/` + user.name, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(function (data) {
            return data;
        }).catch(error => {
            throw(error);
        });
    }



    static createUser(newUser){
        return fetch(`${API_ROOT_URL}user`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        })
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data;
            }).catch(error => {
                throw(error);
            });
    }


    static getUserServices(role) {
        return fetch(`${API_ROOT_URL}roleservices/` + role, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data.services[0]
            })
            .catch(error => {
                return error;
            });
    }

}

export default userLoginApi;