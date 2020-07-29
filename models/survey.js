const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  active:{
    type:Boolean,
    default:true
  },
  published:{
    type:Boolean,
    default:false
  },
  questions:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Question"
    }
  ],
  stores:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Store"
    }
  ],
  qr:{
    type:String,
    default:""
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company"
  },
  meta: {
    taken: Number,
    completed:  Number,
    rating: Number
  }
},
{
  timestamps: true
})

const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey