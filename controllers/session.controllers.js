const mongoose =require('mongoose')
const Sessions=require('../models/session.model')

exports.getAllSessions = async (req, res) => {
    Sessions.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"no Sessions found"})
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

exports.createSession = async (req, res) => {
  const payload = req.body

  if (payload.tags === '') {
    const newTags = ['']
    payload.tags = newTags
  } else {
    const newTags = payload.tags.replace(/\s/g, '').split(',') 
    payload.tags = newTags
  }
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
    const newPrereads = payload.preread.split('')
    payload.preread = newPrereads
  }

  const newSessions = new Sessions(payload)
  try {
     newSessions.save((err,data)=>{
        if(err){
            return res.send({
                statusCode:400,
                message:err.message || 'sessions not added'
            })
        }
        res.send({
            statusCode:201,
            data:data.sessionId,
            message:"Sessions created Successfully"
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

exports.updateSession = async (req, res) => {
  const { id: _id } = req.params
  const payload = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.send({
        StatusCode:404,
        message:'No sessions with that id'
    })
  }
  try{
  const updatedSession = await Sessions.findByIdAndUpdate(_id, payload, {
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

exports.deleteSession = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
     return res.send({
        StatusCode:404,
        message:'No sessions with that id'
      })
  try{

  await Sessions.findByIdAndRemove(id)

  res.send({
    statusCode:200,
    message: 'Session deleted successfully' 
})
  }
  catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    })
    } 
}
