const models = require('../models')
const jwt = require('../utils/jwt')
const adminUtils = require('../utils/adminUtils')

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
                        'category': newCategory.name
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