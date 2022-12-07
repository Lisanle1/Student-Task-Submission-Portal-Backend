const mongoose =require('mongoose')

const capstoneSubmissionSchema = new mongoose.Schema({
  frontendSourceCode: {
    type:String
  },
  frontendDeployed: {
    type:String
  },
  backendSourceCode: {
    type:String
  },
  backendDeployed:  {
    type:String
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model('CapstoneSubmission',capstoneSubmissionSchema)