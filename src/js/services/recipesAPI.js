import axios from 'axios'

function findAll() {
    return axios
        .get("http://localhost:3000/api/")
        .then(response => response.data);
};

function getParams() {
    return axios
        .get('http://localhost:3000/api/user/recipe-params')
        .then(result => result.data )
}

function save(formData) {
    return axios
        .post('http://localhost:3000/api/user/recipe', formData,
    )
}

export default { findAll, getParams, save }
