const models = require('../models')
const jwt = require('../utils/jwt')
const recipeUtils = require('../utils/recipeUtils')
//const sequelize = require('sequelize')

//TODO :  revoir toutes les RQT - optimisation


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

            await recipeUtils.setStepsTagsAndIngredients(tags, steps, ingredients, newRecipe)
                
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
    const image = req.file
    
    const { name, difficulty, serve, making, cook, tags, steps, ingredients, category, isDraft } = req.body
    const userId = req.userId
    const admin = jwt.checkAdmin(req.headers['authorization']) 

    if ( !name || !difficulty || !serve || !making || !cook || !steps || !tags || !category || !ingredients ) { 
        return res.status(400).json({ 'error': 'missing parameters' })
    }

    try {
         const recipeFound = await models.Recipe.findOne({
            where: { id: recipeId }
        })
        if (recipeFound.userId === userId || admin) {
            let updatedRecipe
        
            if(image) {
                updatedRecipe = await recipeFound.update({ name, difficultyId: difficulty, serve, making, cook, categoryId: category, userId, picture: image.path, isDraft }) 
            } else {
                updatedRecipe = await recipeFound.update({ name, difficultyId: difficulty, serve, making, cook, categoryId: category, userId, isDraft }) 
            }
            
            await models.Step.destroy({ where: { recipeId }})
            await models.RecipeIngredient.destroy({ where: { recipeId }})
            await models.RecipeTag.destroy({ where: { recipeId }})

            await recipeUtils.setStepsTagsAndIngredients(tags, steps, ingredients, recipeFound)

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
    const name = req.params.categoryId
    models.Recipe.findAll({
        where: { isDraft: false },
        attributes: ['id','name','picture'],
        include: [
            {
                model: models.Tag,
                as: 'tags',
                required: false,
                attributes: ['name'],
                through: { attributes: [] }
            },
            { 
                model: models.Category,
                as: 'category',
                where: { name },
                attributes: ['name'],
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

exports.getUserRecipes = (req, res) => {
    const userId = req.userId
    models.Recipe.findAll({
        where: { userId },
        attributes: ['id', 'name', 'isDraft'],
        order:[['name', 'ASC']]
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
        attributes: ['name', 'serve', 'making', 'cook', 'picture', 'isDraft'],
        include: [
            { 
                model: models.Tag,
                as: 'tags',
                attributes: ['id'],
                through: { attributes: [] }
            },{ 
                model: models.Category,
                as: 'category',
                attributes: ['id']
            },{ 
                model: models.Difficulty,
                as: 'difficulty',
                attributes: ['id', 'name']
            },{ 
                model: models.User,
                as: 'user',
                attributes: ['id']
            },{
                model: models.Step,
                as: 'steps',
                attributes: ['rank', 'content'], //'id',
                order: [['rank', 'ASC']]
            },{
                model: models.RecipeIngredient,
                as: 'ingredients',
                attributes: ['rank', 'content'], //'id',
                order: [['rank', 'ASC']]
            },{
                model: models.Comment,
                required: false,
                as: 'comments',
                where: { isChecked: 1, isBlocked: 0 },
                attributes:[ 'id', 'content', 'createdAt' ],
                include: [
                    { 
                        model: models.User,
                        as: 'user',
                        attributes: ['name']
                    }/*,{
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
                    } */   
                ],
                order:[['createdAt', 'DESC']]
            }
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

