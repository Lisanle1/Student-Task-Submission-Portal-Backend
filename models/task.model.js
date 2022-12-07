const mongoose= require ('mongoose');

const taskSchema = new mongoose.Schema({
  title:{
    type:String
  },
  frontendSourceCode:{
    type:String
  },
  frontendDeployed:{
    type:String
  },
  backendSourceCode:{
    type:String
  },
  backendDeployed:{
    type:String
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports= mongoose.model('Tasks', taskSchema)

