import axios from 'axios'
import cache from './cache.js';
import { API_URL, RECIPE_API, USER_API, PARAMS_API } from '../config.js';

function getHome() {
    return axios
        .get(API_URL)
        .then(response => response.data);
};

function find(id) {
    return axios
        .get( RECIPE_API + '/' + id)
        .then(result => result.data)
}

function findAll(category){
    return axios
        .get( RECIPE_API + '/category/' + category)
        .then(result => result.data)
}

function getParams() {
    return axios
        .get( USER_API + '/recipe-params')
        .then(result => result.data )
}

async function getCategories(cancelToken) {
    //const cachedCategories = await cache.get('categories')
    //if(cachedCategories) return cachedCategories

    return axios
        .get( PARAMS_API + '/categories', {cancelToken})
        .then(result => { 
            const categories = result.data
            //cache.set('categories', categories)
            return categories
        })
}

function getTags() {
    return axios
    .get( PARAMS_API + '/tags')
    .then(result => result.data )
}

function save(formData) {
    return axios
        .post( USER_API + '/recipe', formData )
        .then(({data}) => data.recipeId)
}

function update(id, formData) {
    return axios
        .put( USER_API + '/recipe/' + id, formData )
        .then(({data}) => data.recipeId)
}


function findByUser() {
    return axios
        .get(USER_API + '/recipe')
        .then(result => result.data)
}

export default { findAll, findByUser, find, getHome, getParams, getCategories, getTags, save, update }
