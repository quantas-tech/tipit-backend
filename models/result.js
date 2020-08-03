const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  completed:{
    type:Boolean,
    default:true
  },
  customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
  },
  answers:[String],
  comment:{
    type:String
  },
  survey:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Survey"
  }
},
{
  timestamps: true
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result