const Company = require('../models/company')
const jimp = require('jimp')
const Vibrant = require('node-vibrant')
const minioClient = require('../config/minio')
const fs = require('fs')

async function create(data, imageFile){
    if(imageFile){
        jimp.read(imageFile.path).then(image=>{
            image
                .cover(128,128)
                .write(imageFile.path,()=>{
                    const meta = {
                        'Content-Type': imageFile.mimetype
                    }
                    minioClient.fPutObject(process.env.S3_BUCKET,imageFile.filename,imageFile.path,meta,(err,tag)=>{
                        if(err){
                            console.log(err)
                        }
                        fs.unlinkSync(imageFile.path)
                    })
                })
        }).then(()=>{
            Vibrant.from(imageFile.path).getPalette(async(err,palette)=>{
                let newCompany = new Company({
                    admins:[data.userId],
                    name:data.name,
                    address:data.address,
                    picture:process.env.S3_BASEURL + imageFile.filename,
                    colors:[palette.Vibrant.getHex(),palette.LightMuted.getHex()]
                })
                await newCompany.save().catch(err=>{
                    console.log(err)
                })
                return newCompany
            })
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