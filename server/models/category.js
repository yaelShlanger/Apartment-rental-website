const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    categoryName:{
        type:String,
        require:true,
        unique:true
    },
    apartmentArray:[{
    type:mongoose.Types.ObjectId,
    ref:'apartment'
}]
})
module.exports=mongoose.model('category',categorySchema)