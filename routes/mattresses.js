const express = require("express");
const router = express.Router();
const Mattresses = require("../models/mattresses");
const mongoose = require("mongoose");
const checkAuth=require('../middleware/check-auth')
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'alpja', 
  api_key: '556517137364383', 
  api_secret: 'FCqYSd-J1Kew_VgMCOBZSIcqnJY'

});

router.get("/", (req, res, next) => {
    Mattresses.find()
    .then((result) => {
      res.status(200).json({
        mattressesData: result,
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
  const file=req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result.url);

  const mattresses = new Mattresses({
    _id:new mongoose.Types.ObjectId(),


    Discount:req.body.Discount,
    Shopby:req.body.Shopby,
    type:req.body.type,
    countInStock:req.body.countInStock,
    description:req.body.description,
    price:req.body.price,
    name:req.body.name,
    actualPrice:req.body.actualPrice,

    imageUrl:result.url
  })
  mattresses.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newMattresses: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    })  
  })
});
router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Mattresses.findById(req.params.id).then(result=>{
res.status(200).json({
    mattresses:result
})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
});
router.delete('/:id',(req,res,next)=>{
Mattresses.remove({_id:req.params.id})
.then(result=>{
    res.status(200).json({
        message:"Mattresses deleted",
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
Mattresses.findOneAndUpdate({
    _id:req.params.id
},{
    Discount:req.body.Discount,
    Shopby:req.body.Shopby,
    type:req.body.type,
    countInStock:req.body.countInStock,
    description:req.body.description,
    price:req.body.price,
    name:req.body.name,
    actualPrice:req.body.actualPrice,
  imageUrl:result.url
    }).then(result=>{
        res.status(200).json({
            updated_mattresses:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;
