const express = require('express')

const controller = require('../controllers/category')
const { checkAuth }= require('../middlewares')
const router = express.Router()

router.get('/',checkAuth,controller.getAllCategory)
router.post('/:id', checkAuth,controller.create)

module.exports = router