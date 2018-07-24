import * as actionTypes from "./actionTypes";
import UserLoginApi from "../api/userLoginApi";


export function loadUserSuccess(users) {
    return {
        type: actionTypes.LOAD_USERS_SUCCESS,
        users: users
    };
}

export const loadUserError = (error) => ({
    type: actionTypes.LOAD_USERS_ERROR,
    error_msg: error,
})

export function getAllUsers(){
    return dispatch => {
        return UserLoginApi.fetchAllUsers()
            .then(users => {dispatch(loadUserSuccess(users))})
            .catch(error => {loadUserError(error)});
    }
}


export function userLoginSuccess(response){

    if(response.res == "fail") {
        return {
            type: actionTypes.LOGIN_ERROR,
            response: response
        };
    } else {
        return {
            type: actionTypes.LOGIN_SUCCESS,
            response: response
        };
    }
};

export const userLoginError = (error) => ({
    type: actionTypes.LOGIN_ERROR,
    error : error,
});

export function userLogin(user){
    return dispatch => {
        return UserLoginApi.userLogin(user)
            .then(response => dispatch(userLoginSuccess(response)))
            .catch(error => dispatch(userLoginError(error)));
    }
}


export const updateUserSuccess = (response, user) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    response: response,
    user: user
});

export const updateUserError = (error) => ({
    type: actionTypes.UPDATE_USER_ERROR,
    msg : error,
});

export function updateUser(user, updatedUser){
    return dispatch => {
        return UserLoginApi.updateUser(user, updatedUser)
            .then(response => dispatch(updateUserSuccess(response, user)))
            .catch(error => dispatch(updateUserError(error)));
    }
}


export const deleteUserSuccess = (response, user) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    msg: response.msg,
    user: user
});

export const deleteUserError = (error) => ({
    type: actionTypes.DELETE_USER_ERROR,
    msg : error,
});

export function deleteUser(user){
    return dispatch => {
        return UserLoginApi.deleteUser(user)
            .then(response => dispatch(deleteUserSuccess(response, user)))
            .catch(error => dispatch(deleteUserError(error)));
    }
}


export const createUserSuccess = (response, user) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    response: response,
    user: user
});

export const createUserError = (error) => ({
    type: actionTypes.CREATE_USER_ERROR,
    msg : error,
});

export function createUser(user){
    return dispatch => {
        return UserLoginApi.createUser(user)
            .then(response => dispatch(createUserSuccess(response, user)))
            .catch(error => dispatch(createUserError(error)));
    }
}


export const getUserServicesSuccess = (services) => ({
        type: actionTypes.GET_ROLE_SERVICES_SUCCESS,
        services: services
})

export const getUserServicesError = (error) => ({
    type: actionTypes.GET_ROLE_SERVICES_ERROR,
    error_msg: error,
})

export function fetchUserServices(role){
    return dispatch => {
        return UserLoginApi.getUserServices(role)
            .then(services => {dispatch(getUserServicesSuccess(services))})
            .catch(error => {getUserServicesError(error)});
    }

}
