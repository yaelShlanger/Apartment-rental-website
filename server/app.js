const express = require('express')
const app = express()
const connnectToDb=require('./connectDB')
const bodyParser=require('body-parser')
const cors=require('cors')

const advertiser=require('./routes/advertiser')
const category=require('./routes/category')
const customer = require('./routes/customer')
const city = require('./routes/city')
const apartment=require('./routes/apartment')
const chatBot = require('./routes/chatBot')

connnectToDb()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use('/advertiser',advertiser)
app.use('/category',category)
app.use('/customer',customer)
app.use('/city',city)
app.use('/apartment',apartment)
app.use('/chatBot',chatBot)


//יצירת מאזין
app.listen('3002', () => {
    console.log('my port working');
})
app.get('', (req, res) => {
    res.status(200).send('working')
})