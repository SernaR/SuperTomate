const models = require('../models')
const jwt = require('../utils/jwt')
const recipeUtils = require('../utils/recipeUtils')
const sequelize = require('sequelize')

exports.addRecipe = async (req, res) => {
    const { name, difficulty, serve, making, cook, tags, steps, ingredients, category, isDraft } = req.body
    const userId = req.userId        

    if ( !name || !difficulty || !serve || !making || !cook || !steps || !tags || !category || !ingredients ) { 
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    try {
        const [newRecipe, created] = await models.Recipe.findOrCreate({
            attributes: ['name'],
            where: { name, userId },
            defaults: { name, difficultyId: difficulty, serve, making, cook, categoryId: category, userId, isDraft}  
        })
        if (created) {
            const newSteps = steps.map( step => { return {...step, recipeId : newRecipe.id} })
            const newIngredients = ingredients.map( ingredient => { return {...ingredient, recipeId : newRecipe.id} })
            
            await models.Step.bulkCreate(newSteps)
            await models.RecipeIngredient.bulkCreate(newIngredients)
            await newRecipe.addTags(tags)
                
            res.status(201).json({ 'recipeName': newRecipe.name })
            
        } else {
            res.status(409).json({ 'error': 'recipe name already exist' })
        }
    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }    
}

exports.updateRecipe = async (req, res) => {
    const recipeId = req.params.recipeId
    const { name, serve, making, cook, steps, ingredients, category } = req.body
    const userId = req.userId
    const admin = jwt.checkAdmin(req.headers['authorization']) 

    if ( !name || !serve || !making || !cook || !steps || !category || !ingredients) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    try {
         const recipeFound = await models.Recipe.findOne({
            where: { id: recipeId }
        })
        if (recipeFound.userId === userId || admin) {
            const ingredientsFound = await recipeUtils.checkIngredients(ingredients)
            const updatedRecipe = await recipeFound.update({ name, serve, making, cook, categoryId: category })   
            await recipeUtils.updateStepsAndIngredients(steps, ingredientsFound, recipeId)
                            
            res.status(201).json({
                'recipeName': updatedRecipe.name
            })             
        } else {
            res.status(403).json({
                'error': 'not authorized path'
            })
        }  
    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }
}

exports.getAllRecipes = (req, res) => {
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
        res.status(200).json({
            'recipes': recipes
        })
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })    
}

exports.getRecipe = (req, res) => {
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
        res.status(200).json({
            'recipes': recipes
        })
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })    
}

exports.getHomepage = async (req,res) => {
    try {
        const bestRecipes = await models.Recipe.findAll({
            attributes: ['name']//,
            /*include: [{
                model: models.Like,
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('liked')), 'Avg'],   
                ]
            }],
            group: ['name'],*/
        })

        const newRecipes = await models.Recipe.findAll({
            attributes: ['id','name'],
            include: [{
                model: models.Tag,
                as: 'tags',
                required: false,
                attributes: ['name'],
                through: { attributes: [] }
            }],
            order: [
                ['id', 'DESC']
            ],
            limit: 8
        })
        
        res.status(200).json({
            'newRecipes': newRecipes,
            'bestRecipe': bestRecipes
        })
    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }   
}

