const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({

    apartmentName: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'category'
    },
    cityId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'city'
    },
    address: {
        type: String,
        require: true
    },
    numOfBeds: {        
        type: Number,
        require: true
    },
    //תוספים
    additives: {
        type: Number,
        require: false
    },
    price: {
        type: Number,
        require: true
    },
    advertiserId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'advertiser'
    }
})

module.exports=mongoose.model('apartment',apartmentSchema)