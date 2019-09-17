const models = require('../models')
const jwt = require('../utils/jwt')
const adminUtils = require('../utils/adminUtils')

exports.addIngredient = (req, res, next) => {
    const name = req.body.ingredient
    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})

    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Ingredient.findOne({
                where: { name }
            })
            .then( ingredientFound => {
                if (!ingredientFound) {
                    models.Ingredient.create({ name })
                    .then( newIngredient => {
                        res.status(201).json({
                            'ingredient': newIngredient.name
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            'error': 'cannot add ingredient'
                        })
                    })    
                } else {
                    res.status(409).json({ 'error': 'ingredient already exist' })
                }
            })
            .catch( err => {
                res.status(500).json({ 'error': 'unable to verify ingredient' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}
exports.addUnit = (req, res, next) => {
    const name = req.body.unit
    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})

    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Unit.findOne({
                where: { name }
            })
            .then( unitFound => {
                if (!unitFound) {
                    models.Unit.create({ name })
                    .then( newUnit => {
                        res.status(201).json({
                            'unit': newUnit.name
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            'error': 'cannot add unit'
                        })
                    })    
                } else {
                    res.status(409).json({ 'error': 'unit already exist' })
                }
            })
            .catch( err => {
                res.status(500).json({ 'error': 'unable to verify unit' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}
exports.addCategory = (req, res, next) => {
    const name = req.body.category
    if (!name) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
        
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Category.findOne({
                where: { name }
            })
            .then( categoryFound => {
                if (!categoryFound) {
                    models.Category.create({ name })
                    .then( newCategory => {
                        res.status(201).json({
                            'category': newCategory.name
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            'error': 'cannot add category'
                        })
                    })    
                } else {
                    res.status(409).json({ 'error': 'category already exist' })
                }
            })
            .catch( err => {
                res.status(500).json({ 'error': 'unable to verify category' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}