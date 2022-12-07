const mongoose =require('mongoose');
const Capstone=require('../models/capstoneProject.model')
const CapstoneSubmission=require('../models/capstoneSubmission.model')

exports.getAllCapstone = async (req, res) => {
    Capstone.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"no Capstones found"})
        }
    try{    
        res.send(data)
    }
    catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    }  
    })
}

exports.createCapstone = async (req, res) => {
  const payload = req.body
  const newCapstone = new Capstone(payload)
  try {
    newCapstone.save((err,data)=>{
       if(err){
           return res.send({
               statusCode:400,
               message:err.message || 'Capstone not added'
           })
       }
       res.send({
           statusCode:201,
           data:data.sessionId,
           message:"Capstone created Successfully"
       })
   })
 }   
 catch{
   res.send({
       statusCode:500,
       message:"Internal server error"
   })
   } 
}

exports.updateCapstone = async (req, res) => {
  const { id: _id } = req.params
  const payload = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.send({
      StatusCode:404,
      message:'No Capstone with that id'
  })
  }
try{
  const updatedCapstone = await Capstone.findByIdAndUpdate(_id, payload, {
    new: true,
  })

  res.send(updatedCapstone)
}
catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}

exports.deleteCapstone = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.send({
      StatusCode:404,
      message:'No Capstone with that id'
  })
  }
  try{
  await Capstone.findByIdAndRemove(id)

  res.send({
    statusCode:200,
    message: 'Capstone deleted successfully' 
})
}
catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}

exports.getAllCapstoneSubmissions = async (req, res) => {
    CapstoneSubmission.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"no CapstoneSubmission data found"})
        }
    try{    
        res.send(data)
    }
    catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    }  
    })
}

exports.createCapstoneSubmissions = async (req, res) => {
  const payload = req.body
  const newSubmission = new CapstoneSubmission(payload)
  try {
    newSubmission.save((err,data)=>{
       if(err){
           return res.send({
               statusCode:400,
               message:err.message || 'CapstoneSubmission not added'
           })
       }
       res.send({
           statusCode:201,
           data:data._id,
           message:"CapstoneSubmission created Successfully"
       })
   })
 }   
 catch{
   res.send({
       statusCode:500,
       message:"Internal server error"
   })
   } 
  }
