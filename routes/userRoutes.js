const express = require('express')
const router = express.Router()

const multer = require('multer')
const imageUtils = require('../utils/imageUtils')
const upload = multer({ storage: imageUtils.memoryStorage, fileFilter: imageUtils.fileFilter })
//const upload = multer({ storage: imageUtils.fileStorage, fileFilter: imageUtils.fileFilter })

const userController = require('../controllers/userController')
const recipeController = require('../controllers/recipeController')
const commentController = require('../controllers/commentController')
const likeController = require('../controllers/likeController')
const recipeParamController = require('../controllers/recipeParamController')

// Users routes
router.get('/profile', userController.getUserProfile)
//router.put('/profile', userController.updateUserProfile)
router.put('/password', userController.updatePassword)

//Recipes routes
router.get('/recipe-params', recipeParamController.getRecipeParams)
router.get('/recipe', recipeController.getUserRecipes)
router.post('/recipe', upload.single('image'), recipeController.fileResize, recipeController.addRecipe)
router.put('/recipe/:recipeId', upload.single('image'), recipeController.updateRecipe)

//comments routes
router.get('/comment', commentController.getUnreadComments)
router.post('/comment/:recipeId', commentController.newComment)
router.put('/comment/:commentId', commentController.setReaded)
router.post('/subcomment/:commentId', commentController.newSubComment)

//like routes
router.post('/like/:recipeId', likeController.noteRecipe)

module.exports = router
