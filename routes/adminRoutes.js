const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')
const params = require('../controllers/recipeParamController')
const commentController = require('../controllers/commentController')

// Users routes
router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.setUserPamams)//?action=promote ou ?action=remove
router.post('/register', userController.register)

//params routes
router.post('/categories', params.addCategory)
router.post('/tags', params.addTag)
router.post('/difficulties', params.addDifficulty)
router.post('/highlights', params.addHighlight)
router.get('/highlights', params.getHighlights)
router.delete('/highlights/:highlightId', params.deleteHighlight)
router.put('/highlights/:highlightId', params.updateHighlight)
router.get('/recipes', recipeController.getRecipesNames)
router.get('/recipeHighlights', params.getRecipeHighlight, recipeController.getRecipeName)
router.post('/recipeHighlights', params.addRecipeHighlight)


//comments routes
router.get('/slug', recipeController.getEmptySlugs)
router.put('/slug/:recipeId', recipeController.setSlug)
router.get('/comment', commentController.getNewComments)
router.post('/comment/:commentId', commentController.setComment)//?action=add ou ?action=remove
router.get('/subcomment', commentController.getNewSubComments)
router.get('/subcomment/:commentId', commentController.setSubComment)//?action=add ou ?action=remove

module.exports = router

