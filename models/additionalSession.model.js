const mongoose= require ('mongoose');

const additionalSessionSchema = new mongoose.Schema({
  heading:{
    type:String
  },
  timing: {
    type:Date
  },
  contents:{
    type:Array
  },
  preread:{
    type:Array
  },
  recording:{
    type:String
  },
  passcode:{
    type:String
  },
})

module.exports= mongoose.model('AdditionalSessions',additionalSessionSchema)