const express = require('express')

const controller = require('../controllers/customer')

//const { checkAuth }= require('../middlewares')

const router = express.Router()

router.post('/customerByEmailPassword', controller.login)
router.post('/', controller.register)

module.exports = router
