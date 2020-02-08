import axios from 'axios'
import { ADMIN_API, USER_API } from '../config.js';


function setCategory(category) {
    return axios
        .post(ADMIN_API + '/category', { category })
};

function setTag(tag) {
    return axios
        .post(ADMIN_API + '/tag', { tag })
};

function setDifficulty(difficulty) {
    return axios
        .post(ADMIN_API + '/difficulty', { difficulty })
};

function getParams() {
    return axios
        .get(USER_API + '/recipe-params')
        .then(result => result.data)
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

export default { setCategory, setTag, setDifficulty, getParams, getComments, moderateComment }
