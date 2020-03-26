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

function getComments() {
    return axios
        .get(ADMIN_API + '/comment')
        .then( result => result.data)
}

function moderateComment(commentId) {
    return axios    
        .post(ADMIN_API + '/comment/' + commentId)
}

export default { addParam, getParams, getComments, moderateComment }
