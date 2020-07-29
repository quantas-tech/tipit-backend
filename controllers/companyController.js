const Company = require('../models/company')
const jimp = require('jimp')

async function create(data, imageFile){
    if(imageFile){
        jimp.read(imageFile.path).then(image=>{
            image
                .cover(128,128)
                .write(imageFile.path)
        }).then(async()=>{
            let newCompany = new Company({
                admins:[data.userId],
                name:data.name,
                address:data.address,
                picture:'http://localhost:3000/static/images/' + imageFile.filename

            })
            await newCompany.save().catch(err=>{
                console.log(err)
            })
            return newCompany
        }).catch(err=>{
            console.log(err)
        })        
    }else{
        let newCompany = new Company({
            admins:[data.userId],
            name:data.name,
            address:data.address
        })
        await newCompany.save().catch(err=>{
            console.log(err)
        })
        return newCompany
    }
    
}

async function update(companyId,data){
    let newCompany = await Company.findByIdAndUpdate(companyId,{$set:data},{new:true}).exec()
    .catch(err=>{
        console.log(err)
    })   
    return newCompany
}

async function index(userId=null){
    let companies = await Company.find({admins:userId}).exec()
    .catch(err=>{
        console.log(err)
    })
    return companies
}


async function show(companyId){
    let company = await Company.findById(companyId)
    .populate('stores')
    .populate('questions')
    .populate('surveys')
    .exec()
    .catch(err=>{
        console.log(err)
    })
    return company
}

module.exports={
    create,
    update,
    index,
    show
}