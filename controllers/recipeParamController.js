const models = require('../models')
const adminUtils = require('../utils/adminUtils')

exports.getRecipeParams = async (req, res) => {
    try {
        const tags = await models.Tag.findAll({ attributes: ['id', 'name'] })
        const difficulties = await models.Difficulty.findAll({ attributes: ['id', 'name'] })
        const categories = await models.Category.findAll({ attributes: ['id', 'name'] })

        res.status(200).json({ tags, difficulties, categories })

    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }         
}

exports.getCategories = async (req, res) => {
    try{
        const categories = await models.Category.findAll({ attributes: ['id', 'name'] })
        res.status(200).json({ categories })
    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }  
}

exports.getTags = async (req, res) => {
    try{
        const tags = await models.Tag.findAll({ attributes: ['id', 'name'] })
        res.status(200).json({ tags })
    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    } 
}

exports.addCategory = (req, res) => {
    const userId = req.userId
    const name = req.body.categories
    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
  
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Category.findOrCreate({
                where: { name }
            })
            .then( ([newCategory, created]) => {
                if (created) {
                    res.status(201).json({
                        'id': newCategory.id,
                        'name': newCategory.name
                    }) 
                } else {
                    res.status(409).json({ 'error': 'category already exist' })
                }
            })
            .catch( () => {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}

exports.addTag = (req, res) => {
    const userId = req.userId
    const name = req.body.tags

    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
  
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Tag.findOrCreate({
                where: { name }
            })
            .then( ([newTag, created]) => {
                if (created) {
                    res.status(201).json({
                        'id': newTag.id,
                        "name": newTag.name
                    }) 
                } else {
                    res.status(409).json({ 'error': 'tag already exist' })
                }
            })
            .catch( () => {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}

exports.addDifficulty = (req, res) => {
    const userId = req.userId
    const name = req.body.difficulties
    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
  
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Difficulty.findOrCreate({
                where: { name }
            })
            .then( ([newDifficulty, created]) => {
                if (created) {
                    res.status(201).json({
                        'id': newDifficulty.id,
                        'name': newDifficulty.name
                    }) 
                } else {
                    res.status(409).json({ 'error': 'difficulty already exist' })
                }
            })
            .catch( () => {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}