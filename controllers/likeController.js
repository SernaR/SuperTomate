const models = require('../models')

exports.noteRecipe = async (req,res) => {
    const userId = req.userId
    const recipeId = req.params.recipeId
    const { record } = req.body

    if (!record)
        return res.status(400).json({ 'error': 'missing parameters' })
    if (isNaN(record) || record < 1 || record > 6) 
        return res.status(400).json({ 'error': 'invalid note' })   

    try {
        const [like, created] = await models.Like.findOrCreate({
            where:{ userId, recipeId },
            defaults: { record, userId, recipeId }
        })

        if (created) {
            res.status(201).json({ 'succes': 'note: '+ record + '/5' })  
        } else {
            res.status(409).json({ 'error': 'you already note this recipe' })
        }

    } catch (err) {
        res.status(500).json({ 'error': 'sorry, an error has occured' })
    }   
}
