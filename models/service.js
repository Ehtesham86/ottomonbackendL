const mongoose=require('mongoose')

const serviceSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    price:String,
    description:String,
    countInStock:Number,
    type:String,
   

       
   
    imageUrl:String
})
module.exports=mongoose.model('Service',serviceSchema)