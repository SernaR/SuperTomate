const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')
const adminUtils = require('../utils/adminUtils')

function userConstraint( name, email, password ) {
    const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX  = /^(?=.*\d).{8,20}$/;

    if (!name || !email || !password) {
        return 'missing parameters'
    }
    if (name.length >= 13 || name.length < 4) {
        return 'wrong username (must be length 4 - 12)'
    }
    if (!EMAIL_REGEX.test(email)) {
        return 'email is not valid'
    }
    if (!PASSWORD_REGEX.test(password)) {
        return 'password invalid (must length 8 - 20 and include 1 number at least)'
    }
    return false
}

exports.register = (req, res, next) => {
    const { name, email, password } = req.body
    const message = userConstraint( name, email, password )
    if (message)
        return res.status(400).json({ 'error': message })

    models.User.findOne({
        attributes: ['name'],
        where: { name }
    }) 
    .then( nameFound => {
        if (!nameFound ) {
            models.User.findOne({
                attributes: ['email'],
                where: { email }
            })
            .then( userFound => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedpassword) => {
                        models.User.create({ name, email, password: bcryptedpassword, isAdmin: 0, isActive: 1 })
                        .then( newUser => {
                            res.status(201).json({
                                'userName': newUser.name
                            })
                        })
                        .catch( err => {
                            res.status(500).json({
                                'error': 'cannot add user'
                            })
                        })
                    })
                } else {
                    res.status(409).json({ 'error': 'email already used' })
                }
            })
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to verify user' })
            })
        } else {
            res.status(409).json({ 'error': 'pseudo already used' })
        }
    })
    .catch ( err => {
        res.status(500).json({ 'error': 'unable to verify user' })
    })  
}

exports.login = (req, res, next) => {
    const { email, password } = req.body
    if ( !email || !password ) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    
    models.User.findOne({
        where: { email }
    })
    .then ( userFound => {
        if (userFound && userFound.isActive) {
            bcrypt.compare(password, userFound.password, (err, bcryptedpassword) => {
                if (bcryptedpassword) {
                    res.status(200).json({
                        'userName': userFound.name,
                        'token': jwt.generateToken(userFound)
                    })
                } else {
                    res.status(403).json({ 'error': 'invalid password'})
                }
            })
        } else {
            res.status(404).json({ 'error': 'user not Found' })
        }
    })
    .catch( err => {
        res.status(500).json({ 'error': 'unable to verify user' })
    })
}
exports.getUserProfile = (req, res, next) => {
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})    
    
    models.User.findOne({
        attributes: [ 'id', 'name', 'email' ],
        where: { id: userId }
    })
    .then( user => {
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(404).json({ 'error': 'user not Found' })
        }
    })
    .catch( err => {
        res.status(500).json({ 'error': 'cannot fetch user' })
    })    
}
exports.getAllUsers = (req, res, next) => {
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})

    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.User.findAll({
                order: [['name', 'ASC']]
            })
            .then( users => {
                res.status(201).json({
                    'users': users
                })
            })
            .catch( err => {
                res.status(500).json({
                    'error': 'cannot find users'
                })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}

exports.updateUserProfile = (req, res, next) => {
    const { name, email, password } = req.body
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})

    const message = userConstraint( name, email, password )
    if (message)
        return res.status(400).json({ 'error': message })
                  
    models.User.findOne({
        where: { id: userId }
    })
    .then( userFound => {
        if (userFound) {
            bcrypt.hash(password, 5, (err, bcryptedpassword) => {
                userFound.update({ name, email, password: bcryptedpassword })
                .then( user => {
                    res.status(201).json({
                        'userName': user.name
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        'error': 'cannot update user'
                    })
                })
            })
        } else {
            res.status(404).json({ 'error': 'user not Found' })
        }
    })
    .catch ( err => {
        res.status(500).json({ 'error': 'unable to verify user' })
    })
}

exports.removeUser = (req, res, next) => {
    const id = req.params.id

    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})    
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.User.findOne({
                where: { id }
            })
            .then( userFound => {
                if (userFound) {      
                    userFound.update({ isActive: 0})
                    .then( user => {
                        res.status(201).json({
                            'userName': user.name
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            'error': 'cannot delete user'
                        })
                    }) 
                } else {
                    res.status(404).json({ 'error': 'user not Found' })
                }
            })
            .catch ( err => {
                console.log(err)
                res.status(500).json({ 'error': 'unable to verify user' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}
exports.setAdmin = (req, res, next) => {
    const id = req.params.id

    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})    
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.User.findOne({
                where: { id }
            })
            .then( userFound => {
                if (userFound) {      
                    userFound.update({ isAdmin: 1 })
                    .then( user => {
                        res.status(201).json({
                            'userName': user.name
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            'error': 'cannot update user'
                        })
                    }) 
                } else {
                    res.status(404).json({ 'error': 'user not Found' })
                }
            })
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to verify user' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}
