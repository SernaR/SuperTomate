const models = require('../models')

exports.noteRecipe = (req,res) => {
    const userId = req.userId
    const recipeId = req.params.recipeId
    const { record } = req.body

    if (!record)
        return res.status(400).json({ 'error': 'missing parameters' })
    if (isNaN(record) || record < 1 || record > 6) 
        return res.status(400).json({ 'error': 'invalid note' })   

    models.Recipe.findOne({
        attributes: ['id'],
        where: { id: recipeId }
    })
    .then( recipeFound => {
        return models.Like.create({ record, userId, recipeId: recipeFound.id })
    })
    .then( () => {
        res.status(201).json({ 'succes': 'note: '+ record + '/5' }) 
    })
    .catch( () => {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    })
}

// modifier une note ? oui
// faire find or create => 2 en 1 rate!!