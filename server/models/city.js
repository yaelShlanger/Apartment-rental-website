const mongoose = require('mongoose')

const citySchema = mongoose.Schema({
    cityName: {
        type: String,
        require: true,
        unique: true
    },
    apartmentArray: [{
        type:mongoose.Types.ObjectId,
        ref: 'apartment'
    }]
})
module.exports = mongoose.model('city', citySchema)