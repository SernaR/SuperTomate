import axios from 'axios'
import { path } from './apiConfig.json'

//utiliser le cache pour les categories - navbar

function getHome() {
    return axios
        .get(path + "/")
        .then(response => response.data);
};

function find(id) {
    return axios
        .get( path + '/recipe/' + id)
        .then(result => result.data)
}

function findAll(category){
    return axios
        .get( path + '/recipe/category/' + category)
        .then(result => result.data)
}

function getParams() {
    return axios
        .get( path + '/user/recipe-params')
        .then(result => result.data )
}

function getCategories() {
    return axios
    .get( path+ '/params/categories')
    .then(result => result.data )
}

function getTags() {
    return axios
    .get( path+ '/params/tags')
    .then(result => result.data )
}

function save(formData) {
    return axios
        .post( path + '/user/recipe', formData,
    )
}

export default { findAll, find, getHome, getParams, getCategories, getTags, save }
