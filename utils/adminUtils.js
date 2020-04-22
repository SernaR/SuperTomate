//const models = require('../models')

/*exports.checkRoleAdmin = (id, cb) => {
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
}*/

exports.highlightCheck = ( title, content ) => {
    const messages = []
    if ( !title ) {
        messages.push({
            propertyPath: 'title',
            message: "le titre doit être renseigné"
        })
    }
    if ( !content ) {
        messages.push({
            propertyPath: 'content',
            message: "le texte d'actualité doit être renseigné"
        })
    }
    return messages
}

