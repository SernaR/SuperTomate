import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { LOGIN_API, ADMIN_API } from '../config.js';

//todo factoriser methodes

function register(user) {
    return axios
        .post(ADMIN_API + '/register', user)
        .then( response => response.data )
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post( LOGIN_API, credentials)
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
        const {exp: expiration, userId:id } = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()) {
            return id
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

function userId() {
    const token = window.localStorage.getItem("authToken");
    const { userId } = jwtDecode(token);
    return userId 
}

export default {
    register,
    authenticate,
    logout,
    setup,
    isAuthenticated,
    isAdmin,
    userId
}