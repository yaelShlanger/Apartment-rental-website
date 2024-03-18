const express = require('express')

const router = express.Router()
const chatBot= require("../controllers/chatBot")

router.post('/reply', chatBot.reply)

module.exports = router