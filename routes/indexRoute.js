const express = require('express')
const verifyToken = require('../middleware/auth')
const router = express.Router()
const indexController = require('../controllers/indexController')


router.get('/', indexController.renderHomepage)
router.get('/categories/:id', indexController.renderCategoryPage)
router.get('/createNew', indexController.renderCreate, verifyToken)
router.post('/createNew', indexController.handleCreate, verifyToken)
router.get('/manaInterface', indexController.renderCRUDPage, verifyToken)
router.get('/manaInterface/deleteById/:id', indexController.handleDelete)
router.get('/manaInterface/updateById/:id', indexController.renderUpdateForm, verifyToken)
router.put('/manaInterface/updateById/:id', indexController.handleUpdate, verifyToken)
router.get('/login', indexController.renderLogin)
router.post('/login', indexController.handleLogin)
module.exports = router