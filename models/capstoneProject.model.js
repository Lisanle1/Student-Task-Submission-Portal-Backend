const mongoose =require('mongoose')

const capstoneProjectSchema = new mongoose.Schema({
  title: {
    type:String
  },
  doclink: {
    type:String
  },
  description: {
    type:String
  },
})

module.exports= mongoose.model('CapstoneProject', capstoneProjectSchema)

