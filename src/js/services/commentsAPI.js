import axios from 'axios'
import { COMMENT_API, ADMIN_API, USER_API } from '../config.js';

function save(commentId, comment) {
    return axios
        .post( COMMENT_API + '/' + commentId, { content: comment })
}

function moderate(commentId, mode) {
    return axios.post( ADMIN_API + '/comment/' + commentId + '?action=' + mode)
}

function findByUser() {
    return axios
        .get(USER_API + '/comment')
        .then(result => result.data)
}

function readed(id) {
    return axios
        .put(USER_API + '/comment/' + id)
}

export default { save, moderate, findByUser, readed }