const express = require('express')

const controller = require('../controllers/city')

//const { checkAuth }= require('../middlewares')

const router = express.Router()
router.post('/:id',controller.create)
router.get('/', controller.getAllCities)

module.exports = router