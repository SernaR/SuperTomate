const models = require('../models')
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

    models.Comment.create({ userId, content, recipeId, isChecked: 0, isBlocked: 0, isReaded: 0 })
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
    models.Comment.findAll({
        attributes: ['id', 'content'],
        include: [
            {
                model:models.User,
                as: 'user',
                attributes: ['name']
            }
        ],
        where: { isChecked: 0 },
        order: [['createdAt', 'ASC']]
    })
    .then( comments => {
        res.status(200).json({ 'comments': comments})
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })         
}

exports.setComment = (req, res) => {
    const action = req.query.action
    const id = req.params.commentId
    let message
    
    models.Comment.findOne({
        where: { id, isChecked: 0 }
    })
    .then( commentFound => {
        if (action === 'add') {
            message = 'validé'
            return commentFound.update({ isChecked: 1 })
        }
        if (action === 'remove') {
            message = 'bloqué'
            return commentFound.update({ isChecked: 1, isBlocked: 1 })  
        }  
    })
    .then( () => {
        res.status(201).json(message)
    })
    .catch ( () => {
        res.status(500).json(err)
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
        res.status(200).json({ 'comments': comments})
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })    
}

exports.setSubComment = (req, res) => {
    const action = req.query.action
    const id = req.params.commentId
    let message
    
    models.SubComment.findOne({
        where: { id, isChecked: 0 }
    })
    .then( commentFound => {
        if (action === 'add') {
            message = 'validated'
            return commentFound.update({ isChecked: 1 })  
        }
        if (action === 'remove') {
            message = 'bloqued'
            return commentFound.update({ isChecked: 1, isBlocked: 1 })  
        }
        message = ': no action specified'    
    })
    .then( () => {
        res.status(201).json({ 'success': 'comment '+ message })
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })  
}

exports.getUnreadComments = (req, res) => {
    const userId = req.userId
    
    models.Comment.findAll({
        attributes: ['id', 'content', 'createdAt'],
        where: { isReaded: false },   
        include: [{
            model:models.Recipe,
            as: 'recipe',
            attributes: ['name'],
            require: true,
            where: { userId }         
        }],
        order: [['createdAt', 'ASC']]
    })
    .then( comments => {
        res.status(200).json({ 'comments': comments})
    })
    .catch ( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

exports.setReaded = async (req, res) => {
    const id = req.params.commentId
    try {
        const comment = await models.Comment.findOne({where: { id } })
        await comment.update( {isReaded: 1} )
        res.status(201).json({ 'success': 'comment updated '})
    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }
}