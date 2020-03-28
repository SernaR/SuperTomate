import axios from 'axios'
import { USER_API } from '../config.js';

function findProfile() {
    return axios
        .get( USER_API + '/profile' )
        .then( response => response.data )
}

function passwordChange(password) {
    return axios
        .put(USER_API + '/password', password)
        .then(response => response.data)
}

export default { findProfile, passwordChange }