const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const params = require('../controllers/recipeParamController')
const commentController = require('../controllers/commentController')

// Users routes
router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.setUserPamams)//?action=promote ou ?action=remove

//params routes
//router.post('/ingredient', params.addIngredient) // a supprimer
//router.post('/unit', params.addUnit) // a supprimer
router.post('/category', params.addCategory)
router.post('/tag', params.addTag)
router.post('/difficulty', params.addDifficulty)

//comments routes
router.get('/comment', commentController.getNewComments)
router.post('/comment/:commentId', commentController.setComment)//?action=add ou ?action=remove
router.get('/subcomment', commentController.getNewSubComments)
router.get('/subcomment/:commentId', commentController.setSubComment)//?action=add ou ?action=remove

module.exports = router

