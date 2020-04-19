const express = require('express')
const router = express.Router()

const recipeController = require('../controllers/recipeController')
const recipeParanController = require('../controllers/recipeParamController')

//homepage route
router.get('/',recipeController.getHomepage)

//Recipes routes
router.get('/recipe/category/:categoryId', recipeController.getAllRecipes)
router.get('/recipe/:recipeId', recipeController.getRecipe)
router.get('/params/categories', recipeParanController.getCategories)
router.get('/params/tags', recipeParanController.getTags)


module.exports = router
