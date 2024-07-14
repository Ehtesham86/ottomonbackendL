const express = require("express");
const router = express.Router();
const Beds = require("../models/beds");
const mongoose = require("mongoose");
const checkAuth=require('../middleware/check-auth')
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'alpja', 
  api_key: '556517137364383', 
  api_secret: 'FCqYSd-J1Kew_VgMCOBZSIcqnJY'

});

router.get("/", (req, res, next) => {
    Beds.find()
    .then((result) => {
      res.status(200).json({
        bedsData: result,
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

  const beds = new Beds({
    _id:new mongoose.Types.ObjectId(),
    name:req.body.name,
    price:req.body.price,
    description:req.body.description,
    countInStock:req.body.countInStock,
    Shopby:req.body.Shopby,
    type:req.body.type,
    Discount:req.body.Discount,
    actualPrice:req.body.actualPrice,
    imageUrl:result.url
  })
  beds.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newBeds: result,
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
  Beds.findById(req.params.id).then(result=>{
res.status(200).json({
    beds:result
})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
});
router.delete('/:id',(req,res,next)=>{
Beds.remove({_id:req.params.id})
.then(result=>{
    res.status(200).json({
        message:"Beds deleted",
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
Beds.findOneAndUpdate({
    _id:req.params.id
},{
  name:req.body.name,
  price:req.body.price,
  description:req.body.description,
  countInStock:req.body.countInStock,
  Shopby:req.body.Shopby,
  type:req.body.type,
  Discount:req.body.Discount,
  actualPrice:req.body.actualPrice,
  imageUrl:result.url
   
  
    }).then(result=>{
        res.status(200).json({
            updated_beds:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;
