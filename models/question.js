const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    default: ""
  },
  type:{
    type:String,
    default:"rating"
  },
  answers:[String],
  icon:{
    type:String,
    default:"fas fa-question"
  },
  active:{
    type:Boolean,
    default:true
  },
  public:{
    type:Boolean,
    default:false
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company"
  }
},
{
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question