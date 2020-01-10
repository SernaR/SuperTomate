import api from './api'
import jwtDecode from 'jwt-decode';

function logout() {
    window.localStorage.removeItem("authToken");
    delete api.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return api
        .post("http://localhost:3000/api/login", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token); 
            setAxiosToken(token);
        })
}

function setAxiosToken(token) {
    api.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
            console.log("Connexion établie avec Axios");
        } else {
            logout();
        } 
    } 
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()) {
            return true
        } 
    } 
    return false
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}