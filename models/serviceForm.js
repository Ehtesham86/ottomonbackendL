const mongoose=require('mongoose')

const ServiceFormSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    Phone:Number,
    email:String,
    address:String,
    time:String,
    city:String,
    country:String,
    cartItems:String,
    type:String,
})
module.exports=mongoose.model('ServiceForm',ServiceFormSchema)