const models = require('../models')
const jwt = require('../utils/jwt')
const adminUtils = require('../utils/adminUtils')
const COMMENT_REGEX = /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/


exports.newComment = (req, res) => {
    const recipeId = req.params.recipeId
    const { content } = req.body
    const userId = req.userId
   
    if (!content) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    if (COMMENT_REGEX.test(content)) {
        return res.status(400).json({ 'error': 'some invalid characters were used' })
    }

    models.Comment.create({ userId, content, recipeId, isChecked: 0, isBlocked: 0 })
    .then( newcomment => {
        if (newcomment) {
            res.status(201).json({ 'success': 'comment sent to admin for validation' })
        } else {
            res.status(500).json({ 'error': 'cannot add comment' })
        }
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

exports.getNewComments = (req, res) => {
    const userId = req.userId
        
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Comment.findAll({
                attributes: ['content'],
                include: [
                    {
                        model:models.User,
                        attributes: ['name']
                    },{
                        model: models.Recipe,
                        attributes: ['name']
                    }
                ],
                where: { isChecked: 0 },
                order: [['createdAt', 'ASC']]
            })
            .then( comments => {
                res.status(201).json({ 'comments': comments})
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

exports.addComment = (req, res) => {
    const id = req.params.commentId
    const userId = req.userId
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.Comment.findOne({
                where: { id, isChecked: 0 }
            })
            .then( commentFound => {
                return commentFound.update({ isChecked: 1 })   
            })
            .then( () => {
                res.status(201).json({ 'success': 'comment validated' })
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

exports.removeComment = (req, res) => {
    const id = req.params.commentId
    const userId = req.userId
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.Comment.findOne({
                where: { id , isChecked: 0 }
            })
            .then( commentFound => {
                return commentFound.update({ isChecked: 1, isBlocked: 1 })   
            })
            .then( () => {
                res.status(201).json({ 'success': 'comment blocked' })
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

exports.newSubComment = (req, res) => {
    const commentId = req.params.commentId
    const { content } = req.body
    const userId = req.userId
    
    if (!content) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    if (COMMENT_REGEX.test(content)) {
        return res.status(400).json({ 'error': 'some invalid characters were used' })
    }

    models.SubComment.create({ userId, content, commentId, isChecked: 0, isBlocked: 0 })
    .then( newcomment => {
        if (newcomment) {
            res.status(201).json({ 'success': 'comment sent to admin for validation' })
        } else {
            res.status(500).json({ 'error': 'cannot add comment' })
        }
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

exports.getNewSubComments = (req, res) => {
    const userId = req.userId
        
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.SubComment.findAll({
                attributes: ['content'],
                include: [
                    {
                        model:models.User,
                        attributes: ['name']
                    }
                ],
                where: { isChecked: 0 },
                order: [['createdAt', 'ASC']]
            })
            .then( comments => {
                res.status(201).json({ 'comments': comments})
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

exports.addSubComment = (req, res) => {
    const id = req.params.commentId
    const userId = req.userId
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.SubComment.findOne({
                where: { id, isChecked: 0 }
            })
            .then( commentFound => {
                return commentFound.update({ isChecked: 1 })  
            })
            .then( () => {
                res.status(201).json({ 'success': 'comment validated' })
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

exports.removeSubComment = (req, res) => {
    const id = req.params.commentId
    const userId = req.userId
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.SubComment.findOne({
                where: { id , isChecked: 0 }
            })
            .then( commentFound => {
                return commentFound.update({ isChecked: 1, isBlocked: 1 })
                
            })
            .then( () => {
                res.status(201).json({ 'success': 'comment blocked' })
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