const models = require('../models')
const jwt = require('../utils/jwt')
const adminUtils = require('../utils/adminUtils')
const COMMENT_REGEX = /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/


exports.newComment = (req, res, next) => {
    const recipeId = req.params.recipeId
    const { content } = req.body
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})    
    
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
    .catch ( err => {
        res.status(500).json({ 'error': 'unable to add comment' })
    })
}
exports.getNewComments = (req, res, next) => {
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
        
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
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to get comments' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })       
}

exports.addComment = (req, res, next) => {
    const id = req.params.commentId
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.Comment.findOne({
                where: { id, isChecked: 0 }
            })
            .then( commentFound => {
                commentFound.update({ isChecked: 1 })
                .then( validatedComment => {
                    res.status(201).json({ 'success': 'comment validated' })
                })
                .catch ( err => {
                    res.status(500).json({ 'error': 'unable to validate comment' })
                })
            })
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to get comment' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })          
}

exports.removeComment = (req, res, next) => {
    const id = req.params.commentId
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.Comment.findOne({
                where: { id , isChecked: 0 }
            })
            .then( commentFound => {
                commentFound.update({ isChecked: 1, isBlocked: 1 })
                .then( blockedComment => {
                    res.status(201).json({ 'success': 'comment blocked' })
                })
                .catch ( err => {
                    res.status(500).json({ 'error': 'unable to block comment' })
                })
            })
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to get comment' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })          
}

exports.newSubComment = (req, res, next) => {
    const commentId = req.params.commentId
    const { content } = req.body
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})    
    
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
    .catch ( err => {
        res.status(500).json({ 'error': 'unable to add comment' })
    })
}
exports.getNewSubComments = (req, res, next) => {
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
        
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
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to get comments' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })     
}

exports.addSubComment = (req, res, next) => {
    const id = req.params.commentId
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.SubComment.findOne({
                where: { id, isChecked: 0 }
            })
            .then( commentFound => {
                commentFound.update({ isChecked: 1 })
                .then( validatedComment => {
                    res.status(201).json({ 'success': 'comment validated' })
                })
                .catch ( err => {
                    res.status(500).json({ 'error': 'unable to validate comment' })
                })
            })
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to get comment' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })      
}

exports.removeSubComment = (req, res, next) => {
    const id = req.params.commentId
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
    
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) { 
            models.SubComment.findOne({
                where: { id , isChecked: 0 }
            })
            .then( commentFound => {
                commentFound.update({ isChecked: 1, isBlocked: 1 })
                .then( blockedComment => {
                    res.status(201).json({ 'success': 'comment blocked' })
                })
                .catch ( err => {
                    res.status(500).json({ 'error': 'unable to block comment' })
                })
            })
            .catch ( err => {
                res.status(500).json({ 'error': 'unable to get comment' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })
}              