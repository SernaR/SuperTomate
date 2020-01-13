const models = require('../models')
//const jwt = require('../utils/jwt')
const adminUtils = require('../utils/adminUtils')

//TODO : suppression methode obsolete
//TODO : refacto add

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

//a supprimer
exports.addIngredient = (req, res) => {
    const userId = req.userId
    const name = req.body.ingredient
    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Ingredient.findOrCreate({
                where: { name }
            })
            .then( ([newIngredient, created]) => {
                if (created) {
                    res.status(201).json({
                        'ingredient': newIngredient.name
                    })   
                } else {
                    res.status(409).json({ 'error': 'ingredient already exist' })
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

//a supprimer
exports.addUnit = (req, res) => {
    const userId = req.userId
    const name = req.body.unit
    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Unit.findOrCreate({
                where: { name }
            })
            .then( ([newUnit, created]) => {
                if (created) {
                    res.status(201).json({
                        'unit': newUnit.name
                    })
                } else {
                    res.status(409).json({ 'error': 'unit already exist' })
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
exports.addCategory = (req, res) => {
    const userId = req.userId
    const name = req.body.category
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
    const name = req.body.tag
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
    const name = req.body.difficulty
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