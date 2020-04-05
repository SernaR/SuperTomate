const models = require('../models')

exports.setStepsTagsAndIngredients = async (tags, steps, ingredients, recipe)  => {

    const newSteps = JSON.parse(steps).map( step => { return {...step, recipeId: recipe.id} })
    const newIngredients =JSON.parse(ingredients).map( ingredient => { return {...ingredient, recipeId: recipe.id} })
    
    await models.Step.bulkCreate(newSteps) 
    await models.Ingredient.bulkCreate(newIngredients)
    await recipe.addTags(JSON.parse(tags)) 

}


