import api from './api'

function findAll() {
    return api
        .get("/")
        .then(response => response.data);
};

function getParams() {
    return api
        .get('/user/recipe-params')
        .then(result => result.data )
}

function save(formData) {
    return api
        .post('/user/recipe', formData,
    )
}

export default { findAll, getParams, save }
