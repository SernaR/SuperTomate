const models = require('../models')
const jwt = require('../utils/jwt')
const recipeUtils = require('../utils/recipeUtils')
//const sequelize = require('sequelize')

//TODO :  revoir toutes les RQT - optimisation
//TODO : revoir update, manque l'image

exports.addRecipe = async (req, res) => {
    const { name, difficulty, serve, making, cook, tags, steps, ingredients, category, isDraft } = req.body
    const userId = req.userId 
    const image = req.file
        
    if ( !name || !difficulty || !serve || !making || !cook || !steps || !tags || !category || !ingredients ) { 
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    if(!image) {
        res.status(422).json({ 'error': 'attached file is not an image' }) 
    }
    
    const picture = image.path
    try {
        const [newRecipe, created] = await models.Recipe.findOrCreate({
            attributes: ['name'],
            where: { name, userId },
            defaults: { name, difficultyId: difficulty, serve, making, cook, categoryId: category, userId, picture, isDraft}  
        })
        if (created) { 
            const newSteps = JSON.parse(steps).map( step => { return {...step, recipeId : newRecipe.id} })
            const newIngredients =JSON.parse(ingredients).map( ingredient => { return {...ingredient, recipeId : newRecipe.id} })
            
            await models.Step.bulkCreate(newSteps)
            await models.RecipeIngredient.bulkCreate(newIngredients)
            await newRecipe.addTags(JSON.parse(tags))
                
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
        attributes: ['name', 'serve', 'making', 'cook', 'picture'],
        include: [
            { 
                model: models.Category,
                as: 'category',
                attributes: ['name']
            },{ 
                model: models.Difficulty,
                as: 'difficulty',
                attributes: ['name']
            },{ 
                model: models.User,
                as: 'user',
                attributes: ['name']
            },{
                model: models.Step,
                as: 'steps',
                attributes: ['rank', 'content'],
                order: [['step', 'ASC']]
            },{
                model: models.RecipeIngredient,
                as: 'ingredients',
                attributes: ['rank', 'content'],
                order: [['rank', 'ASC']]
            },/*{
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
                    
                ],
                order:[['createdAt', 'DESC']]
            }}*/
        ]
    })
    .then( recipe => {
        res.status(200).json({
            'recipe': recipe
        })
    })
    .catch( (err) => {
        console.log(err)
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
            attributes: ['id','name','picture'],
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

