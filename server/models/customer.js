const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
   
    customerName: {
        type: String,
    },
    customerEmail: {
        type: String,
        require: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    customerPassword: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('customer', customerSchema)