import axios from 'axios'
import { COMMENT_API } from '../config.js';

function save(commentId, comment) {
    return axios
        .post( COMMENT_API + '/' + commentId, { content: comment })
}

export default { save }