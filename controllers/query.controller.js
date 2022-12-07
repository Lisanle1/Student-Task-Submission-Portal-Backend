const mongoose =require('mongoose')
const Query=require('../models/query.model');

exports.getAllQueries = async (req, res) => {
    Query.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"no Query found"})
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

exports.createQuery = async (req, res) => {
  const payload = req.body
  const newQuery = new Query(payload)
  try {
    newQuery.save((err,data)=>{
       if(err){
           return res.send({
               statusCode:400,
               message:err.message || 'Query not added'
           })
       }
       res.send({
           statusCode:201,
           data:data._id,
           message:"Query created Successfully"
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

exports.updateQuery = async (req, res) => {
  const { id: _id } = req.params
  const payload = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.send({
        StatusCode:404,
        message:'No Query with that id'
    })
  }
  try{
  const updatedQuery = await Query.findByIdAndUpdate(_id, payload, {
    new: true,
  })

  res.send(updatedQuery)
}
  catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}

exports.deleteQuery = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.send({
        StatusCode:404,
        message:'No Query with that id'
    })
  }
  try{
  await Query.findByIdAndRemove(id)

  res.send({
    statusCode:200,
    message: 'Query deleted successfully' 
})
  }
  catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}