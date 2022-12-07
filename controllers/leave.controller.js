const Leave=require('../models/leave.model')

exports.getLeaves = async (req, res) => {
    Leave.find((err,data)=>{
        if(err){
        return res.status(400).send({message:"no Leave found"})
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

exports.createLeaves = async (req, res) => {
  const payload = req.body
  const newLeave = new Leave(payload)
  try {
     newLeave.save((err,data)=>{
        if(err){
            return res.send({
                statusCode:400,
                message:err.message || 'Leave not added'
            })
        }
        res.send({
            statusCode:201,
            data:data._id,
            message:"Leave created Successfully"
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