import axios from 'axios'
import { COMMENT_API, ADMIN_API } from '../config.js';

function save(commentId, comment) {
    return axios
        .post( COMMENT_API + '/' + commentId, { content: comment })
}

function moderate(commentId, mode) {
    return axios.post( ADMIN_API + '/comment/' + commentId + '?action=' + mode)
}


export default { save, moderate }