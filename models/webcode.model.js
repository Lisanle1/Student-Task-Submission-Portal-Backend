const mongoose =require('mongoose')

const webcodeSchema = new mongoose.Schema({
  title: {
    type:String
  },
  doclink:  {
    type:String
  },
  description:  {
    type:String
  },
})

module.exports = mongoose.model('Webcodes', webcodeSchema)

