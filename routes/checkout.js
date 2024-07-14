const express = require("express");
const router = express.Router();
const Checkout = require("../models/checkout");
const mongoose = require("mongoose");
const checkAuth=require('../middleware/check-auth')
const cloudinary=require('cloudinary').v2;
// cloudinary.config({ 
//   cloud_name: 'alpja', 
//   api_key: '556517137364383', 
//   api_secret: 'FCqYSd-J1Kew_VgMCOBZSIcqnJY'

// });

router.get("/", (req, res, next) => {
    Checkout.find()
    .then((result) => {
      res.status(200).json({
        checkoutData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/",
// checkAuth,
(req, res, next) => {
//   const file=req.files.photo;
//   cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
//     console.log(result.url);

  const checkout = new Checkout({
    _id:new mongoose.Types.ObjectId(),
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    Phone:req.body.Phone,
    cartItems:req.body.cartItems,
    email:req.body.email,
    type:req.body.type,
    total:req.body.total,
    address:req.body.address,
    time:req.body.time,
    city:req.body.city,
   
    country:req.body.countInStock,
 
  })
  checkout.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newCheckout: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
     
    })  
  })
});
router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Checkout.findById(req.params.id).then(result=>{
res.status(200).json({
    checkout:result
})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
});
router.delete('/:id',(req,res,next)=>{
    Checkout.remove({_id:req.params.id})
.then(result=>{
    res.status(200).json({
        message:"Checkout data deleted",
        result:result
    })
}).catch(err=>{
    res.status(500).json({
        error:err
    })
})
})
router.put('/:id',(req,res,next)=>{
console.log(req.params.id);
Checkout.findOneAndUpdate({
    _id:req.params.id
},{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    Phone:req.body.Phone,
    type:req.body.type,
    email:req.body.email,
    cartItems:req.body.cartItems,
    address:req.body.address,
    time:req.body.time,
    city:req.body.city,
    total:req.body.total,
    country:req.body.countInStock,
    cartItems:req.body.countInStock
    }).then(result=>{
        res.status(200).json({
            updated_checkout:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;
