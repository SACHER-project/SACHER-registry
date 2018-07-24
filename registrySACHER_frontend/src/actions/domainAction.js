import * as actionTypes from './actionTypes';
import DomainApi from '../api/domainApi';

export const temp = [{"enabled": true, "description": "Owns users and projects created by heat", "name": "heat", "id": "29dd3148f3954d19bf3152e337ee9eb4"}, {"enabled": true, "description": "testDescription1", "name": "testName1", "id": "3318a3a67e7946c6a49e0191fcf9929d"}, {"enabled": true, "description": "tttttttttttttt", "name": "ttttttttttttt", "id": "350bb0188d9942faacfeeef9585e87c4"}, {"enabled": true, "description": "rwrwerwe", "name": "rwerwerw", "id": "3d3bdce49d124673b78fb1c9469e10e4"}, {"enabled": true, "description": "domainDescription", "name": "domainName", "id": "62f7117430a64d8780feb092be121772"}, {"enabled": true, "description": "", "name": "admin_domain", "id": "86bf0276cde34f3f9f659d82433415c2"}, {"enabled": true, "description": "Used for swift functional testing", "name": "swift_test", "id": "aa605379451a4b33820449b5a765556f"}, {"enabled": true, "description": "The default domain", "name": "Default", "id": "default"}, {"enabled": true, "description": "qqqqqqqqqq", "name": "qqqqqqqqqq", "id": "df76fad6bb234fc7a80c5eb241788300"}];



export function loadDomainSuccess(domains) {
    return {type: actionTypes.LOAD_DOMAINS_SUCCESS, domains};
}

export const loadDomainError = (error) => ({
    type: actionTypes.LOAD_DOMAINS_ERROR,
    error_msg: error,
})

export function getAllDomains(){
    return dispatch => {
        return DomainApi.fetchAllDomains()
            .then(domains => {dispatch(loadDomainSuccess(domains))})
            .catch(error => {loadDomainError(error)});
    }
}



export const deleteDomainSuccess = (response, domain) => ({
    type: actionTypes.DELETE_DOMAIN_SUCCESS,
    msg: response.msg,
    domain: domain
});

export const deleteDomainError = (error) => ({
    type: actionTypes.DELETE_DOMAIN_ERROR,
    msg : error,
});

export function deleteDomain(domain){
    return dispatch => {
        return DomainApi.deleteDomain(domain)
            .then(response => dispatch(deleteDomainSuccess(response, domain)))
            .catch(error => dispatch(deleteDomainError(error)));
    }
}



export const createDomainSuccess = (response, domain) => ({
    type: actionTypes.CREATE_DOMAIN_SUCCESS,
    response: response,
    domain: domain
});

export const createDomainError = (error) => ({
    type: actionTypes.CREATE_DOMAIN_ERROR,
    msg : error,
});

export function createDomain(domain){
    return dispatch => {
        return DomainApi.createDomain(domain)
            .then(response => dispatch(createDomainSuccess(response, domain)))
            .catch(error => dispatch(createDomainError(error)));
    }
}




export const updateDomainSuccess = (response, domain) => ({
    type: actionTypes.UPDATE_DOMAIN_SUCCESS,
    response: response,
    domain: domain
});

export const updateDomainError = (error) => ({
    type: actionTypes.UPDATE_DOMAIN_ERROR,
    msg : error,
});

export function updateDomain(domain, updatedDomain){
    return dispatch => {
        return DomainApi.updateDomain(domain, updatedDomain)
            .then(response => dispatch(updateDomainSuccess(response, domain)))
            .catch(error => dispatch(updateDomainError(error)));
    }
}
