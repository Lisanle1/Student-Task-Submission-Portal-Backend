const mongoose =require('mongoose')

const sessionSchema = new mongoose.Schema({
  sessionId:{
    type:Number
},
  heading: {
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
  task:{
    type:String
  },
  tags:{
    type:Array
  },
  recording: {
    type:String
  },
  passcode: {
    type:String
  },
  submission: [
    {
      typolabel:{
        type:String
      },
      fieldname: {
        type:String
      },
    },
  ],
})

module.exports= mongoose.model('Sessions', sessionSchema)

