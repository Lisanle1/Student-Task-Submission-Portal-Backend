const mongoose =require('mongoose')

const webcodeSubmissionSchema = new mongoose.Schema({
  frontendSourceCode:{
    type:String
  },
  frontendDeployed: {
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

module.exports = mongoose.model('WebcodeSubmissions',webcodeSubmissionSchema)

