const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const params = require('../controllers/recipeParamController')
const commentController = require('../controllers/commentController')

// Users routes
router.get('/user', userController.getAllUsers)
router.get('/user/admin/:id', userController.setAdmin)
router.get('/user/remove/:id', userController.removeUser)

//params routes
router.post('/ingredient', params.addIngredient)
router.post('/unit', params.addUnit)
router.post('/category', params.addCategory)

//comments routes
router.get('/comment', commentController.getNewComments)
router.get('/comment/validate/:commentId', commentController.addComment)
router.get('/comment/remove/:commentId', commentController.removeComment)
router.get('/subcomment', commentController.getNewSubComments)
router.get('/subcomment/validate/:commentId', commentController.addSubComment)
router.get('/subcomment/remove/:commentId', commentController.removeSubComment)

module.exports = router

