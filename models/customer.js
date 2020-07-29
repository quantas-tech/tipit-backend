const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  address:{
    type:String,
    default:""
  },
  phone:{
    type:String,
    default:""
  },
  email:{
    type:String,
    default:""
  },
  active:{
    type:Boolean,
    default:true
  },
  user:{
      type:String,
      default:""
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company"
  }
},
{
  timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer