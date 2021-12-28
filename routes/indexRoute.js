const express = require('express')
const verifyToken = require('../middleware/auth')
const router = express.Router()
const indexController = require('../controllers/indexController')


router.get('/', indexController.renderHomepage)

router.get('/categories/:id', indexController.renderCategoryPage)
// handle Create shop
router.get('/createNew', indexController.renderCreate, verifyToken)
router.post('/createNew', indexController.handleCreate, verifyToken)
// render CRUD page
router.get('/manaInterface', indexController.renderCRUDPage, verifyToken)
//handle Delete
router.get('/manaInterface/deleteById/:id', indexController.handleDelete)
//handle Update
router.get('/manaInterface/updateById/:id', indexController.renderUpdateForm, verifyToken)
router.put('/manaInterface/updateById/:id', indexController.handleUpdate, verifyToken)
//handle Login
router.get('/login', indexController.renderLogin)
router.post('/login', indexController.handleLogin)

module.exports = router