const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  slug:{
    type:String,
    slug:"name",
    slug_padding_size: 2,
    unique: true
  },
  address:{
    type:String,
    default:""
  },
  picture:{
    type:String,
    default:""
  },
  admins:[String],
  stores:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Store"
    }
  ],
  questions:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Question"
    }
  ],
  surveys:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Survey"
    }
  ],
  active:{
    type:Boolean,
    default:true
  },
  colors:{
    type: Array,
    default: ['#EA462B','#ffffff']
  },
  config:[String]
},
{
  timestamps: true
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company