import { API_ROOT_URL } from './api-config';

class DomainApi {


    static fetchAllDomains() {
        return fetch(`${API_ROOT_URL}domains`, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data["domains"]
            })
            .catch(error => {
                return error;
            });
    }



    static deleteDomain(domain) {
        return fetch(`${API_ROOT_URL}domain/` + domain.id, {method: 'DELETE'})
            .then(response => {
                return response.json();
            })
            .catch(function(error){
                throw(error);
                //return error;
            });
    }


    static createDomain(newDomain){
        return fetch(`${API_ROOT_URL}domain`, {
            method: 'POST',
            body: JSON.stringify(newDomain),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.json()
            //window.alert("Domain CREATED!!!!!!!!!!!!!!");
        })
        .then(function (data) {
            return data;
        }).catch(error => {
            throw(error);
            //window.alert("Erro creating domain: " + error.message);
        });
    }


    static updateDomain(domain, updatedDomain) {
        return fetch(`${API_ROOT_URL}domain/` + domain.id, {
            method: 'PUT',
            body: JSON.stringify(updatedDomain),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(function (data) {
            return data;
        }).catch(error => {
            throw(error);
            //window.alert("Update Domain Error");
        });
    }


}

export default DomainApi;