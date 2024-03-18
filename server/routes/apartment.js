const express = require('express')
const controller = require('../controllers/apartment')
const {checkAuth }= require('../middlewares')
const router = express.Router()

 router.put('/:id',checkAuth,controller.update)
 router.post('/', controller.create)
 router.delete('/:id/:apartment',checkAuth, controller.delete) 
 router.get('/',controller.getAll)
 router.get('/:id', checkAuth,controller.getById)
 router.get('/categoryId/:id', checkAuth,controller.getByCategoryId)
 router.get('/cityId/:id', controller.getByCityId)
 router.get('/cityIp/:userIp', controller.getByIp)
 router.get('/AdvertiserId/:id', controller.getByAdvertiserId)
 router.get('/LittleThenPrice/:price', checkAuth,controller.getByLittleThenPrice)
 router.get('/BiggerThenPrice/:price', checkAuth,controller.getByBiggerThenPrice)

 module.exports = router