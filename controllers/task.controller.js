const Tasks=require ('../models/task.model')

exports.getAllTasks = async (req, res) => {
        Tasks.find((err,data)=>{
            if(err){
            return res.status(400).send({message:"no Tasks found"})
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

exports.createTasks = async (req, res) => {
  const payload = req.body

  const newTask = new Tasks(payload)
  try {
     newTask.save((err,data)=>{      
        if(err){
            return res.send({
                statusCode:400,
                message:err.message || 'tasks not added'
            })
        }
        res.send({
            stausCode:201,
            title:data.title,
            message:"Tasks Created Successfull"
        })
    });
  }
  catch{
    res.send({
        statusCode:500,
        message:"Internal server error"
    });
}
}
