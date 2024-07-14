const mongoose=require('mongoose')

const CheckoutSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    Phone:Number,
    email:String,
    address:String,
    time:String,
    total:Number,
    city:String,
    country:String,
    cartItems:Array,
    type:String,
})
module.exports=mongoose.model('Checkout',CheckoutSchema)