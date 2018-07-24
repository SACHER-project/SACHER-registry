import FileSaver from 'file-saver';
import { API_ROOT_URL } from './api-config';


class ContainerApi {

    static fetchAllContainers(project_name) {
        return fetch(`${API_ROOT_URL}containerlist/` + project_name, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data["containers"]
            })
            .catch(error => {
                return error;
            });
    }



    static containerReadEnable(project_name, container_name) {
        return fetch(`${API_ROOT_URL}readenable/` + project_name +"/" + container_name, {method: 'GET'})
            .then(response => {
                return response.json();
            })
            .catch(function(error){
                throw(error);
                //return error;
            });
    }


    static containerReadDisable(project_name, container_name) {
        return fetch(`${API_ROOT_URL}readdisable/` + project_name +"/" + container_name, {method: 'GET'})
            .then(response => {
                return response.json();
            })
            .catch(function(error){
                throw(error);
            });
    }


    static showContainerContent(project_name, container_name, folder_name) {
        return fetch(`${API_ROOT_URL}containercontent/` + project_name + "/" + container_name + "/" + folder_name, {method: 'GET'})
            .then(response => {
                return response.json()
            })
            .then(function (data) {
                return data["content"]
            })
            .catch(error => {
                return error;
            });
    }


    static download(project_name, container_name, content_name) {
        return fetch(`${API_ROOT_URL}download/` + project_name +"/" + container_name +"/" + content_name, {method: 'GET'})
            .then(response => {
                return response.blob();
            }).then(function(blob) {
                // FileSaver.download (blob);
                FileSaver.saveAs(blob, content_name);
            })
            .catch(function(error){
                throw(error);
            });
    }


    static uploadContent(project_name, container_name, data) {

        var formData = new FormData();
        formData.append('fileLoaded', data);

        return fetch(`${API_ROOT_URL}upload/` + project_name +"/" + container_name, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            return response;
        })
        .catch(function(error){
            throw(error);
        });
    }


    static deleteContainerContent(project_name, container_name, content_name) {
        return fetch(`${API_ROOT_URL}deleteobject/` + project_name +"/" + container_name +"/" + content_name, {method: 'DELETE'})
            .then(response => {
                return response.json();
            })
            .catch(function(error){
                throw(error);
            });
    }

}

export default ContainerApi;