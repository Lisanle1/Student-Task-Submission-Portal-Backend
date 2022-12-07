const mongoose=require('mongoose');
const AdditionalSession =require('../models/additionalSession.model')

exports.getAllAdditionalSessions = async (req, res) => {
    AdditionalSession.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"No AdditionalSession found"})
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

exports.createAdditionalSession = async (req, res) => {
  const payload = req.body

  if (payload.contents === '') {
    const newContents = ['']
    payload.contents = newContents
  } else {
    const newContents = payload.contents.split(',')
    payload.contents = newContents
  }

  if (payload.preread === '') {
    const newPrereads = ['']
    payload.preread = newPrereads
  } else {
    const newPrereads = payload.preread.split(',')
    payload.preread = newPrereads
  }

  const newSessions = new AdditionalSession(payload)
  try {
    newSessions.save((err,data)=>{
        if(err){
            return res.send({
                statusCode:400,
                message:err.message || 'Additionalsessions not added'
            })
        }
        res.send({
            statusCode:201,
            data:data.heading,
            message:"AdditionalSessions created Successfully"
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

exports.updateAdditionalSession = async (req, res) => {
  const { id: _id } = req.params
  const payload = req.body
 
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No Additionalsessions with that id')
    try{
  const updatedSession = await AdditionalSession.findByIdAndUpdate(
    _id,
    payload,
    {
      new: true,
    })

  res.send(updatedSession)
}
  catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}

exports.deleteAdditionalSession = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No sessions with that id')
try{
  await AdditionalSession.findByIdAndRemove(id)

  res.send({
    statusCode:200,
    message: 'AdditionalSession deleted successfully' 
})
}
catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
}
}