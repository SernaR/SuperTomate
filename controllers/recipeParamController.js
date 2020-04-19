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
        return res.status(400).json('aucune catégorie renseignée')
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
                    res.status(409).json('La catégorie existe déjà')
                }
            })
            .catch( (err) => {
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
        return res.status(400).json('aucun tag renseigné')
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
                    res.status(409).json('Le tag existe déjà')
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
        return res.status(400).json('aucune difficulté renseignée')
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
                    res.status(409).json('La difficulté existe déjà')
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


exports.addHighlight = (req, res) => {
    const userId = req.userId
    const { title, content } = req.body
   
    const messages = adminUtils.highlightCheck( title, content )
    if (messages.length > 0)
        return res.status(422).json(messages)
  
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.Highlight.create({ title, content })
            .then( (newHighlight) => {
                res.status(201).json( newHighlight )
            })    
            .catch( (err) => {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}

exports.getHighlights = (req, res) => {
    const userId = req.userId
    adminUtils.checkRoleAdmin(userId, async admin => {
        if (admin) {
            try{
                const highlights = await models.Highlight.findAll({ attributes: ['id', 'title', 'content'] })
                res.status(200).json({ highlights })
            } catch (err) {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            } 
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
    
}

exports.deleteHighlight = (req, res) => {
    const userId = req.userId
    const id = req.params.highlightId

    adminUtils.checkRoleAdmin(userId, async admin => {
        if (admin) {
            try{
                const highlight = await models.Highlight.findByPk(id)
                await highlight.destroy()
                res.status(201).json({ 'message': 'highlight deleted' })
            } catch (err) {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            } 
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })     
}


exports.updateHighlight = (req, res) => {
    const userId = req.userId
    const id = req.params.highlightId
    const { title, content } = req.body

    adminUtils.checkRoleAdmin(userId, async admin => {
        if (admin) {
            try{
                const highlight = await models.Highlight.findByPk(id)
                await highlight.update({ title, content })
                res.status(201).json( highlight )
            } catch (err) {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            } 
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })     
}

exports.getRecipeHighlight = (req, res) => {
    const userId = req.userId
    adminUtils.checkRoleAdmin(userId, async admin => {
        if (admin) {
            try{
                const recipeHighlight = await models.RecipeHighlight.findAll({
                    attributes: ['recipeId', 'highlightId'],
                    order:[['id', 'DESC']],
                    limit: 1
                })
                const recipe = await models.Recipe.findByPk(recipeHighlight[0].recipeId, { attributes: ['name'] })
                recipeHighlight[0].dataValues.recipeName = recipe.name
                
                res.status(201).json( recipeHighlight[0] )
            } catch (err) {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            } 
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })     
}

exports.addRecipeHighlight = (req, res) => {
    const userId = req.userId
    adminUtils.checkRoleAdmin(userId, admin => {
        if (admin) {
            models.RecipeHighlight.create({ ...req.body })
            .then( (newRecipeHighlight) => {
                res.status(201).json( newRecipeHighlight )
            })    
            .catch( (err) => {
                res.status(500).json({ 'error': 'sorry, an error has occured' })
            })
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }    
    })   
}