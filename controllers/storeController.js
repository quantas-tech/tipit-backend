const Store = require('../models/store')
const jimp = require('jimp')

async function create(data,imageFile=null){
    if(imageFile){
        jimp.read(imageFile.path).then(image=>{
            image
                .cover(128,128)
                .write(imageFile.path)
        }).then(async()=>{
            let newStore = new Store({
                name:data.name,
                address:data.address,
                company:data.companyId,
                picture:'http://localhost:3000/static/images/' + imageFile.filename
            })
            await newStore.save()
            return newStore
        }).catch(err=>{
            console.log(err)
        })        
    }else{
        let newStore = new Store({
            name:data.name,
            address:data.address,            
            company:data.companyId,
        })
        await newStore.save()
        return newStore
    }
    
}

async function update(id,data,imageFile=null){
    if(imageFile){
        jimp.read(imageFile.path).then(image=>{
            image
                .cover(128,128)
                .write(imageFile.path)
        }).then(async()=>{
            data.picture = 'http://localhost:3000/static/images/' + imageFile.filename
            let newStore = await Store.findByIdAndUpdate(id,{$set:data},{new:true}).exec().catch(err=>{
                console.log(err)
            })   
            return newStore
        }).catch(err=>{
            console.log(err)
        })        
    } else {
        let newStore = await Store.findByIdAndUpdate(id,{$set:data},{new:true}).exec().catch(err=>{
            console.log(err)
        })   
        return newStore
    }
    
}

async function index(companyId){
    let stores = await Store.find({company:companyId}).exec().catch(err=>{
        console.log(err)
    })   
    return stores
}

async function destroy(storeId){
    await Store.findByIdAndDelete(storeId)
    .exec()
    .catch(err=>console.log(err))
    return true
}

module.exports={
    create,
    update,
    index,
    destroy   
}