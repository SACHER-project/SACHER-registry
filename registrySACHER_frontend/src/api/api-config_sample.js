let backendHost;
// const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;


if(hostname === 'localhost') {
    backendHost = 'http://localhost:5000/';
} else if(hostname === 'insert_IP') {
    backendHost = 'http://insert_IP:5000/';
} else {
    throw new Error("CANNOT FIND ENDPOINT VARIABLE!");
}

export const API_ROOT_URL = `${backendHost}`;
