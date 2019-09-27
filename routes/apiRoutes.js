const express = require('express')
const router = express.Router()

const recipeController = require('../controllers/recipeController')

//homepage route
router.get('/',recipeController.getHomepage)

//Recipes routes
router.get('/recipe', recipeController.getAllRecipes)
router.get('/recipe/:recipeId', recipeController.getRecipe)

module.exports = router
