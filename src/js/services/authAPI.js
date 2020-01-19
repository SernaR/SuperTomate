import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { path } from './apiConfig.json'

//todo factoriser methodes

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post( path + "/login", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token); 
            setAxiosToken(token);
        })
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
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

function isAdmin() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const { isAdmin: admin } = jwtDecode(token);
        return admin
    } 
    return false
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    isAdmin
}