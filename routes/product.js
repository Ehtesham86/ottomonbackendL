const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");
const checkAuth=require('../middleware/check-auth')
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'alpja', 
  api_key: '556517137364383', 
  api_secret: 'FCqYSd-J1Kew_VgMCOBZSIcqnJY'

});

router.get("/", (req, res, next) => {
    Product.find()
    .then((result) => {
      res.status(200).json({
        productData: result,
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

  const product = new Product({
    _id:new mongoose.Types.ObjectId(),
    name:req.body.name,
    bed:req.body.bed,
    price:req.body.price,
    description:req.body.description,
    type:req.body.type,
    countInStock:req.body.countInStock,
  
    imageUrl:result.url
  })
  product.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newProduct: result,
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
  Product.findById(req.params.id).then(result=>{
res.status(200).json({
    product:result
})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
});
router.delete('/:id',(req,res,next)=>{
Product.remove({_id:req.params.id})
.then(result=>{
    res.status(200).json({
        message:"Product deleted",
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
Product.findOneAndUpdate({
    _id:req.params.id
},{
    name:req.body.name,
    bed:req.body.bed,
    price:req.body.price,
    description:req.body.description,
    type:req.body.type,
    countInStock:req.body.countInStock,
  
    imageUrl:req.body.imageUrl
    }).then(result=>{
        res.status(200).json({
            updated_product:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;
