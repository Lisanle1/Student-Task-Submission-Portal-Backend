const mongoose =require('mongoose')

const leaveSchema = new mongoose.Schema({
  noOfDays:{
    type:String
  },
  startDate:{
    type:Date
  },
  endDate:{
    type:Date
  },
  reason:{
    type:String
  },
  status:{
    type:String
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports= mongoose.model('Leaves', leaveSchema)

