const mongoose = require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const connectToDb= async ()=>{
    await mongoose.connect(process.env.LOCAL_URI)
}

module.exports=connectToDb
