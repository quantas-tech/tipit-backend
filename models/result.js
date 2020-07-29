const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  active:{
    type:Boolean,
    default:true
  },
  customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
  },
  question:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Question"
  },
  answer:{
    type:String
  },
  comment:{
    type:String
  },
  stores:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Store"
    }
  ],
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company"
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