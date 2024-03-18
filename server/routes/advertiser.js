const express = require('express')

const controller = require('../controllers/advertiser')
// const {checkAuth }= require('../middlewares')
const router = express.Router()

router.post('/advertiserByEmailAndPassword', controller.login)
router.post('/', controller.register)

module.exports = router
