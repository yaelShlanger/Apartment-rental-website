const mongoose = require('mongoose')

const advertiserSchema = mongoose.Schema({

    advertiserEmail: {
        type: String,
        unique:true,
        require:true,
        trim: true,
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    
    advertiserPassword: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    additionalPhone: {
        type: String,
        require: false,
    },
    apartmentArray:[{
        type: mongoose.Types.ObjectId,
        ref:'apartment'
    }
    ]
})

module.exports=mongoose.model('advertiser',advertiserSchema)
