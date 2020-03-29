const models = require('../models')
const Op = require('sequelize').Op
const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')
const adminUtils = require('../utils/adminUtils')
const authUtils = require('../utils/authUtils')


exports.register = (req, res) => {
    const { name, email, password } = req.body
    const messages = authUtils.userConstraint( name, email, password )
    if (messages.length > 0)
        return res.status(422).json(messages)

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
        if (created) {
            res.status(201).json({
                'userName': user.name
            })  
        } else {
            const messages = authUtils.registerCheck(user, name, email)
            res.status(409).json(messages)
        }
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body

    const messages = authUtils.loginCheck(email, password)
    console.log(messages)
    if (messages.length > 0)
        return res.status(422).json(messages)
    
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
                    res.status(403).json([{
                        propertyPath: 'password',
                        message: "Mot de passe invalide"
                    }])
                }
            })
        } else {
            res.status(404).json([{
                propertyPath: 'email',
                message: "Aucun compte ne possède cette adresse"
            }])
        }
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}
exports.getUserProfile = (req, res) => {
    const userId = req.userId
    models.User.findOne({
        attributes: [ 'name', 'email' ],
        where: { id: userId },
        //include: [{ all: true }]
    })
    .then( user => {
        if (user) {
            res.status(200).json(user)
        }
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })    
}
exports.getAllUsers = (req, res) => {
    const userId = req.userId

    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.User.findAll({
                order: [['name', 'ASC']]
            })
            .then( users => {
                res.status(200).json({
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

exports.updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body
    const userId = req.userId
    const message = userConstraint( name, email, password )
    if (message)
        return res.status(422).json({ 'error': message })

    try {
        const existingUsers = await models.User.findAll({
        attributes: ['name', 'email'],
            where: { 
                [Op.or]: [ {name}, {email} ],
                id: { [Op.ne]: userId }
            }
        })
        
        function getErrorMessage(users) {   
            let msg = ''
            users.forEach( user => {
                if (msg !== '') { msg += 'and '}
                if (name === user.name) { msg += 'name ' }
                if (name === user.name && email === user.email) { msg += 'and '}
                if (email === user.email) { msg += 'email ' }
            })
            return msg
        }

        const errorMessage = getErrorMessage(existingUsers)
        if (errorMessage === '') {
            const user = await models.User.findByPk(userId)
            const bcryptedpassword = await bcrypt.hash(password, 5)
            const updatedUser = await user.update({ name, email, password: bcryptedpassword })

            res.status(201).json({
                'userName': updatedUser.name
            })
        } else {
            return res.status(409).json({ 'error': errorMessage + 'already used'})
        }    
    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }      
}

exports.updatePassword = async (req,res) => {
    const userId = req.userId
    const { password } = req.body
    
    const message = authUtils.passwordConstraint( password )
    if (message)
        return res.status(400).json(message)

    try {
        const user = await models.User.findByPk(userId)
        const bcryptedpassword = await bcrypt.hash(password, 5)
        await user.update({ password: bcryptedpassword })  
        
        res.status(201).json({
            'success': 'password Updated'
        })

    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }     
}

exports.setUserPamams = (req, res) => {
    const id = req.params.id
    const action = req.query.action
    const userId = req.userId   
    
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
