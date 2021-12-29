const express = require('express')

const router = express.Router()
const indexController = require('../controllers/indexController')


router.get('/', indexController.renderHomepage)

router.get('/categories/:id', indexController.renderCategoryPage)
// handle Create shop
router.get('/createNew', indexController.renderCreate)
router.post('/createNew', indexController.handleCreate)
// render CRUD page
router.get('/manaInterface', indexController.renderCRUDPage)
//handle Delete
router.get('/manaInterface/deleteById/:id', indexController.handleDelete)
//handle Update
router.get('/manaInterface/updateById/:id', indexController.renderUpdateForm)
router.put('/manaInterface/updateById/:id', indexController.handleUpdate)
//handle Login
router.get('/login', indexController.renderLogin)
router.post('/login', indexController.handleLogin)

module.exports = router