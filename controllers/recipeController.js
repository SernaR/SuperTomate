const models = require('../models')
const jwt = require('../utils/jwt')
const recipeUtils = require('../utils/recipeUtils')

exports.addRecipe = async (req, res) => {
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

    try {
        const ingredientsFound = await recipeUtils.checkIngredients(ingredients)
        const [newRecipe, created] = await models.Recipe.findOrCreate({
            attributes: ['name'],
            where: { name, userId },
            defaults: { name, serve, making, cook, categoryId: category, userId }
        })

        if (created) {
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
            .then( () => {
                res.status(201).json({
                    'recipeName': newRecipe.name
                })
            })   
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
        res.status(201).json({
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
        res.status(201).json({
            'recipes': recipes
        })
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })    
}
