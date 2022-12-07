const mongoose =require('mongoose')

const querySchema = new mongoose.Schema({
  category:{
    type:String
  },
  language:{
    type:String
  },
  title:{
    type:String
  },
  description: {
    type:String
  },
  endtime:{
    type:Date
  },
  starttime:{
    type:Date
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports= mongoose.model('Query', querySchema)

