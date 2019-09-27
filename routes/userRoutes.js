const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')
const commentController = require('../controllers/commentController')

// Users routes
router.get('/profile', userController.getUserProfile)
router.put('/profile', userController.updateUserProfile)

//Recipes routes
router.post('/recipe', recipeController.addRecipe)
router.put('/recipe/:recipeId', recipeController.updateRecipe)

//comments routes
router.post('/comment/:recipeId', commentController.newComment)
router.post('/subcomment/:commentId', commentController.newSubComment)

module.exports = router
