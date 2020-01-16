import axios from 'axios'
import { path } from './apiConfig.json'

function findAll() {
    return axios
        .get(path + "/")
        .then(response => response.data);
};

function find(id) {
    return axios
        .get( path + '/recipe/' + id)
        .then(result => result.data)
}

function getParams() {
    return axios
        .get( path + '/user/recipe-params')
        .then(result => result.data )
}

function save(formData) {
    return axios
        .post( path + '/user/recipe', formData,
    )
}

export default { findAll, find, getParams, save }
