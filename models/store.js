const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  address:{
    type:String,
    default:""
  },
  picture:{
    type:String,
    default:""
  },
  active:{
    type:Boolean,
    default:true
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company"
  },
  config:[String]
},
{
  timestamps: true
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store