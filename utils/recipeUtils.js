const models = require('../models')

exports.checkIngredients = (ingredients) => { 
    const promises = []
    return new Promise( (resolve, reject) => {
        models.Ingredient.findAll()
        .then( ingredientList => {
            ingredients.forEach( ingredient => {
                const existingIngredient = ingredientList.find( i => i.id === ingredient.ingredientId || i.name === ingredient.name)
                if (!existingIngredient) {
                    const promise = models.Ingredient.create({ name: ingredient.name })
                    promises.push(promise)
                }
                else if (ingredient.ingredientId === null) {
                    ingredient.ingredientId = existingIngredient.id
                }
            })
            Promise.all(promises)
            .then( result => {
                if (result.length > 0) {
                    result.forEach( r => {
                        const ingredientIndex = ingredients.findIndex( i => i.name === r.name)
                        ingredients[ingredientIndex].ingredientId = r.id
                    })
                }
                resolve(ingredients)  
            })
        })
    })   
}

exports.updateStepsAndIngredients = (steps, ingredients, recipeId)  => {
    const promises = []
    return new Promise( (resolve, reject) => {
        models.Step.findAll({
            where: { recipeId }
        })
        .then( stepsFound => {
            steps.forEach( step => {
                const existingStep = stepsFound.find( s => s.id === step.stepId )
                if (!existingStep) {
                    promises.push(
                        models.Step.create({ 
                            recipeId,
                            step: step.step,
                            content: step.content
                        })
                    )    
                } else {
                    promises.push( 
                        existingStep.update({
                            step: step.step,
                            content: step.content 
                        })
                    )    
                }
            })
            stepsFound.forEach( step => {
                const existingStep = steps.find( s => s.stepId === step.id )
                if (!existingStep) {
                    promises.push( step.destroy() )
                } 
            })
        })
        
        models.RecipeIngredient.findAll({
            where: { recipeId }
        })
        .then( ingredientsFound => {
            ingredients.forEach( ingredient => {
                const existingIngredient = ingredientsFound.find( i => i.id === ingredient.recipeIngredientId )
                if (!existingIngredient) {
                    promises.push(
                        models.RecipeIngredient.create({ 
                            quantity: ingredient.quantity,
                            unitId: ingredient.unitId,
                            recipeId,
                            ingredientId: ingredient.ingredientId
                        })
                    )    
                } else {
                    promises.push(
                        existingIngredient.update({
                            quantity: ingredient.quantity,
                            unitId: ingredient.unitId,
                            ingredientId: ingredient.ingredientId
                        })
                    )    
                }
            })
            ingredientsFound.forEach( ingredient => {
                const existingIngredient = ingredients.find( i => i.recipeIngredientId === ingredient.id )
                if (!existingIngredient) {
                    promises.push( ingredient.destroy() )
                }
            })
        })
        
        Promise.all(promises)
        .then( result => {
            return resolve(result)     
        })
        .catch( err => {
            return reject( Error('sorry, an error has occured') )
        })
    })    
}
