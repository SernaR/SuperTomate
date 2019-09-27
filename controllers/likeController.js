const models = require('../models')

exports.noteRecipe = (req,res) => {
    const userId = req.userId
    const recipeId = req.params.recipeId
    const { liked } = req.body

    if (!liked)
        return res.status(400).json({ 'error': 'missing parameters' })
    if (isNaN(liked) || liked < 1 || liked > 6) 
        return res.status(400).json({ 'error': 'invalid note' })   

    models.Recipe.findOne({
        attributes: ['id'],
        where: { id: recipeId }
    })
    .then( recipeFound => {
        return models.Like.create({ liked, userId, recipeId: recipeFound.id })
    })
    .then( () => {
        res.status(201).json({ 'succes': 'note: '+ liked + '/5' }) 
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

//modifier une note ? non