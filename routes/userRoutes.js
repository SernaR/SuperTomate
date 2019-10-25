const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')
const commentController = require('../controllers/commentController')
const likeController = require('../controllers/likeController')

// Users routes
router.get('/profile', userController.getUserProfile)
router.put('/profile', userController.updateUserProfile)
router.put('/password', userController.updatePassword)

//Recipes routes
router.post('/recipe', recipeController.addRecipe)
router.put('/recipe/:recipeId', recipeController.updateRecipe)

//comments routes
router.post('/comment/:recipeId', commentController.newComment)
router.post('/subcomment/:commentId', commentController.newSubComment)

//like routes
router.post('/like/:recipeId', likeController.noteRecipe)

module.exports = router
