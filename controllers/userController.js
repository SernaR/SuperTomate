const models = require('../models')
const Op = require('sequelize').Op
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

exports.register = (req, res) => {
    const { name, email, password } = req.body
    const message = userConstraint( name, email, password )
    if (message)
        return res.status(400).json({ 'error': message })

    bcrypt.hash(password, 5)
    .then( bcryptedpassword => {
        return models.User.findOrCreate({
            attributes: ['name', 'email'],
            where: { 
                [Op.or]: [ {name}, {email} ] 
            },
            defaults: { name, email, password: bcryptedpassword, isAdmin: 0, isActive: 1 }
        })
    })
    .then( ([user, created]) => {
        let messageAlert
        if (created) {
            res.status(201).json({
                'userName': user.name
            })  
        } else {
            if (user.name === name && user.email === email) {
                messageAlert = 'user already exist'
            } else if (user.name === name) {
                messageAlert = 'pseudo already used'
            } else {
                messageAlert = 'email already used'
            }
            res.status(409).json({ 'error': messageAlert })
        }
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

exports.login = (req, res) => {
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
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}
exports.getUserProfile = (req, res) => {
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
        }
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })    
}
exports.getAllUsers = (req, res) => {
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
            .catch( () => {
                res.status(500).json({
                    'error': 'sorry, an error has occured'
                })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}

exports.updateUserProfile = (req, res) => {
    const { name, email, password } = req.body
    const userId = jwt.getUserId(req.headers['authorization'])
   
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})

    const message = userConstraint( name, email, password )
    if (message)
        return res.status(400).json({ 'error': message })

    models.User.findAll({
    attributes: ['id', 'name', 'email'],
        where: { 
            [Op.or]: [ { id: userId }, {name}, {email} ],
        }
    })
    .then( users => {
        const usersAlert = users.filter( user =>  user.id !== userId )
        if(usersAlert.lengh > 0) {
            //afinner le message
            usersAlert.forEach( userAlert => {
                if (userAlert.name === name && userAlert.email === email) {
                    messageAlert = 'pseudo and email are already used'
                } else if (userAlert.name === name) {
                    messageAlert = 'pseudo already used'
                } else {
                    messageAlert = 'email already used'
                }
            })
        }
        users[0].messageAlert = messageAlert    
        return users[0]
    })
    .then( user => {
        if(!user.message) {
            return bcrypt.hash(password, 5)
        } else {
            return res.status(409).json({ 'error': user.message })
        }
    })
    .then( bcryptedpassword => {
        return fetchedUser.update({ name, email, password: bcryptedpassword })
    })                    
    .then( user => {
        res.status(201).json({
            'userName': user.name
        })
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

exports.setUserPamams = (req, res) => {
    const id = req.params.id
    const action = req.query.action

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
                if (userFound && action === 'remove') {      
                    return userFound.update({ isActive: 0})  
                } else if (userFound && action === 'promote') {
                    return userFound.update({ isAdmin: 1 })
                }
            })
            .then( user => {
                res.status(201).json({
                    'userName': user.name
                })
            })
            .catch ( () => {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}
