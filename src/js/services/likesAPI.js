import axios from 'axios'
import { LIKE_API } from '../config.js';

function record(recipeId, record) {
    return axios
        .post( LIKE_API + recipeId, { record })
}

export default { record }