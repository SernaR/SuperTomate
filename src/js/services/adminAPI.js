import axios from 'axios'
import { ADMIN_API, USER_API } from '../config.js';

function addParam(value, param) {
    return axios
        .post(ADMIN_API + '/' + param, { [param]:value }).then( result => result.data)
}

function getParams() {
    return axios
        .get(USER_API + '/recipe-params')
        .then(result => result.data)
}

function addHighlight(highlight) {
    return axios
        .post( ADMIN_API + '/highlights', highlight)
        .then(result => result.data)
}

function getHighlights() {
    return axios
        .get(ADMIN_API + '/highlights')
        .then(result => result.data)
}

function deleteHighlight (id) {
    return axios
        .delete(ADMIN_API + '/highlights/' + id)
        
}

function updateHighlight (highlight) {
    return axios
        .put(ADMIN_API + '/highlights/' + highlight.id, highlight)
        
}
function getComments() {
    return axios
        .get(ADMIN_API + '/comment')
        .then( result => result.data)
}

function moderateComment(commentId) {
    return axios    
        .post(ADMIN_API + '/comment/' + commentId)
}

function getRecipes() {
    return axios
        .get(ADMIN_API + '/recipes')
        .then( result => result.data)
}

function getRecipeHighlight() {
    return axios
    .get(ADMIN_API + '/recipeHighlights')
    .then( result => result.data)
}

function addRecipeHighlight(recipeHighlight) {
    return axios
    .post(ADMIN_API + '/recipeHighlights', recipeHighlight)
    .then( result => result.data)
}

export default { addParam, getParams, getComments, moderateComment, addHighlight, getHighlights, deleteHighlight, updateHighlight, getRecipes, getRecipeHighlight,addRecipeHighlight }
