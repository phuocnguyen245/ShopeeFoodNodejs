const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')


router.get('/', indexController.homepage)
router.get('/categories/:id', indexController.findCategories)
router.get('/createNew', indexController.basicMenu)
router.post('/createNew', indexController.createNew)
router.get('/manaInterface', indexController.updateDelete)
router.get('/manaInterface/deleteById/:id', indexController.deleteById)
router.get('/manaInterface/updateById/:id', indexController.updateById)
router.put('/manaInterface/updateById/:id', indexController.handleUpdate)
router.get('/login', indexController.handleLogin)
module.exports = router