const models = require('../models')

exports.checkRoleAdmin = (id, cb) => {
    models.User.findOne({
        attributes: [ 'isAdmin' ],
        where: { id }
    })
    .then( user => {
        return cb(user.isAdmin)  
    })
    .catch( err => {
        console.log(err)
    })    
}

