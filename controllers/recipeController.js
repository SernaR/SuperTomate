const models = require('../models')
const Op = require('sequelize').Op
const jwt = require('../utils/jwt')
const recipeUtils = require('../utils/recipeUtils')

exports.addRecipe = (req, res, next) => {
    const { name, serve, making, cook, steps, ingredients, category } = req.body
    const promises = []
    //const { name, serve, making, cook, category } = req.body //pour le test
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})        

    if ( !name || !serve || !making || !cook || !steps || !category || !ingredients) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    recipeUtils.checkIngredients(ingredients)
    .then( ingredientsFound => {
        if (ingredientsFound) {
            models.Recipe.findOne({
                attributes: ['name'],
                where: { name, userId }
            })
            .then ( recipeFound => {
                if (!recipeFound) {
                    models.Recipe.create({ name, serve, making, cook, categoryId: category, userId })
                    .then( newRecipe => {
                        if (newRecipe) {
                            steps.forEach( s => { 
                                const promise = models.Step.create({ 
                                    recipeId: newRecipe.id,
                                    step: s.step,
                                    content: s.content
                                })
                                promises.push(promise)
                            })
        
                            ingredientsFound.forEach( i => { 
                                const promise = models.RecipeIngredient.create({ 
                                    quantity: i.quantity,
                                    unitId: i.unitId,
                                    recipeId: newRecipe.id,
                                    ingredientId: i.ingredientId
                                })
                                promises.push(promise)
                            })
        
                            Promise.all(promises)
                            .then( result => {
                                if (result) {
                                    res.status(201).json({
                                        'recipeName': newRecipe.name
                                    })
                                } else {
                                    res.status(500).json({ 'error': 'cannot add steps/ingredients' });
                                }
                            })
                            .catch ( err => {
                                res.status(500).json({ 'error': 'unable to add steps/ingredients' });
                            }) 
                        } else {
                            res.status(500).json({ 'error': 'cannot add recipe' });
                        } 
                    })
                    .catch( err => {
                        res.status(500).json({
                            'error': 'unable to add recipe'
                        })
                    })
                } else {
                    res.status(409).json({ 'error': 'recipe name already exist' })
                }
            })
            .catch( err => {
                res.status(500).json({ 'error': 'unable to verify recipe' })
            })
        } else {
            res.status(500).json({ 'error': 'cannot verity ingredients' })
        }
    }).catch( err => {
        res.status(500).json({ 'error': 'unable to verity ingredients' })
    })
}

exports.updateRecipe = (req, res, next) => {
    const recipeId = req.params.recipeId
    const { name, serve, making, cook, steps, ingredients, category } = req.body
    //const { name, serve, making, cook, category } = req.body //pour le test
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})   

    const admin = jwt.checkAdmin(req.headers['authorization']) 

    if ( !name || !serve || !making || !cook || !steps || !category || !ingredients) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    models.Recipe.findOne({
        where: { id: recipeId }
    })
    .then( recipeFound => {
        if (recipeFound.userId === userId || admin) {
            recipeUtils.checkIngredients(ingredients).then( ingredientsFound => {
                if (ingredientsFound) {
                    recipeFound.update({ name, serve, making, cook, categoryId: category })
                    .then( updatedRecipe => {
                        if (updatedRecipe) {
                            //code
                            recipeUtils.updateStepsAndIngredients(steps, ingredients, recipeId)
                            .then( result => {
                                if (result) {
                                    res.status(201).json({
                                        'recipeName': updatedRecipe.name
                                    })
                                } else {
                                    res.status(500).json({ 'error': 'cannot update ingredients and steps' })
                                }
                            })
                            .catch( err => {
                                res.status(500).json({ 'error': 'unable to update ingredients and steps' })
                            })                            
                        } else {
                            res.status(500).json({ 'error': 'cannot update recipe' })
                        }
                    })
                    .catch( err => {
                        res.status(500).json({ 'error': 'unable to update recipe' })
                    })
                } else {
                    res.status(500).json({ 'error': 'cannot test ingredients' });
                }
            }).catch( err => {
                res.status(500).json({ 'error': 'unable to verity ingredients' })
            })          
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }  
    })
    .catch( err => {
        res.status(500).json({ 'error': 'unable to verify recipe' })
    })    
}

exports.getAllRecipes = (req, res, next) => {
    models.Recipe.findAll({
        attributes: ['name', 'serve', 'making', 'cook'],
        include: [
            { 
                model: models.Category,
                attributes: ['name']
            },{ 
                model: models.User,
                attributes: ['name']
            },{
                model: models.Step,
                attributes: ['step', 'content'],
                order: [['step', 'ASC']]
            },{
                model: models.RecipeIngredient,
                attributes: ['quantity'],
                include: [{
                    model: models.Ingredient,
                    attributes: ['name']
                },{
                    model: models.Unit,
                    attributes: ['name']
                }],
                order: [['id', 'ASC']]
            }
        ],
        order: [['name', 'ASC']]
    })
    .then( recipes => {
        res.status(201).json({
            'recipes': recipes
        })
    })
    .catch( err => {
        res.status(500).json({
            'error': 'cannot find recipes'
        })
    })    
}

exports.getRecipe = (req, res, next) => {
    const id = req.params.recipeId
    models.Recipe.findOne({
        where: { id },
        attributes: ['name', 'serve', 'making', 'cook'],
        include: [
            { 
                model: models.Category,
                attributes: ['name']
            },{ 
                model: models.User,
                attributes: ['name']
            },{
                model: models.Step,
                attributes: ['step', 'content'],
                order: [['step', 'ASC']]
            },{
                model: models.RecipeIngredient,
                attributes: ['quantity'],
                include: [{
                    model: models.Ingredient,
                    attributes: ['name']
                },{
                    model: models.Unit,
                    attributes: ['name']
                }],
                order: [['id', 'ASC']]
            },{
                model: models.Comment,
                required: false,
                where: { isChecked: 1, isBlocked: 0 },
                attributes:[ 'content', 'createdAt' ],
                include: [
                    { 
                        model: models.User,
                        attributes: ['name']
                    },{
                        model: models.SubComment,
                        required: false,
                        where: { isChecked: 1, isBlocked: 0 },
                        attributes:[ 'content', 'createdAt' ],
                        include: [
                            { 
                                model: models.User,
                                attributes: ['name']
                            }
                        ],
                        order:[['createdAt', 'DESC']] 
                    }
                ],
                order:[['createdAt', 'DESC']]
            }
        ]
    })
    .then( recipes => {
        res.status(201).json({
            'recipes': recipes
        })
    })
    .catch( err => {
        res.status(500).json({
            'error': 'cannot find recipes'
        })
    })    
}
