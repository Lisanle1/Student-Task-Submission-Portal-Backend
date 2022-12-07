const mongoose =require('mongoose');
const Webcode=require('../models/webcode.model')
const WebcodeSubmissions=require('../models/webcodeSubmission.model')

exports.getAllWebcodes = async (req, res) => {
    Webcode.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"no webcodes found"})
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

exports.createWebcode = async (req, res) => {
  const payload = req.body
  const newWebcode = new Webcode(payload)
  try {
    newWebcode.save((err,data)=>{
       if(err){
           return res.send({
               statusCode:400,
               message:err.message || 'webcode not added'
           })
       }
       res.send({
           statusCode:201,
           data:data.sessionId,
           message:"webcode created Successfully"
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

exports.updateWebcode = async (req, res) => {
  const { id: _id } = req.params
  const payload = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)){
  return res.send({
    StatusCode:404,
    message:'No webcode with that id'
})
}
try{
  const updatedWebcode = await Webcode.findByIdAndUpdate(_id, payload, {
    new: true,
  })

  res.send(updatedWebcode)
}
catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}

exports.deleteWebcode = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.send({
      StatusCode:404,
      message:'No webcode with that id'
  })
  }
  try{
  await Webcode.findByIdAndRemove(id)

  res.send({
    statusCode:200,
    message: 'webcode deleted successfully' 
})
  }
  catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}

exports.getWebcodeSubmissions = async (req, res) => {
    WebcodeSubmissions.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"no webcodesubmission data found"})
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

exports.createWebcodeSubmissions = async (req, res) => {
  const payload = req.body
  const newSubmission = new WebcodeSubmissions(payload)
  try {
     newSubmission.save((err,data)=>{
        if(err){
            return res.send({
                statusCode:400,
                message:err.message || 'webcodeSubmissions not added'
            })
        }
        res.send({
            statusCode:201,
            data:data._id,
            message:"webcodeSubmissions created Successfully"
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