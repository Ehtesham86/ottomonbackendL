const express = require("express");
const router = express.Router();
const ServiceForm = require("../models/serviceForm");
const mongoose = require("mongoose");
// const checkAuth=require('../middleware/check-auth')
const cloudinary=require('cloudinary').v2;


router.get("/", (req, res, next) => {
    ServiceForm.find()
    .then((result) => {
      res.status(200).json({
        serviceFormData: result,
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


  const serviceForm = new ServiceForm({
    _id:new mongoose.Types.ObjectId(),
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    Phone:req.body.Phone,
    type:req.body.type,
    email:req.body.email,
  
    address:req.body.address,
    time:req.body.time,
    city:req.body.city,
   
    country:req.body.countInStock,
    cartItems:req.body.countInStock,
  })
  serviceForm.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newServiceForm: result,
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
  ServiceForm.findById(req.params.id).then(result=>{
res.status(200).json({
    serviceForm:result
})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
});
router.delete('/:id',(req,res,next)=>{
    ServiceForm.remove({_id:req.params.id})
.then(result=>{
    res.status(200).json({
        message:"ServiceForm data deleted",
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
  
    address:req.body.address,
    time:req.body.time,
    city:req.body.city,
   
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
