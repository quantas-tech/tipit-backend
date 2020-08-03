const Survey = require('../models/survey')

async function create(companyId, data){
    let newSurvey = new Survey({
        name:data.name,
        description:data.description,
        company:companyId
    })
    await newSurvey.save()
    return newSurvey
}

async function update(id,data){
    let newSurvey= await Survey.findByIdAndUpdate(id,{$set:data},{new:true}).populate('questions stores').exec().catch(err=>{
        console.log(err)
    })   
    return newSurvey
}

async function index(companyId){
    let surveys = await Survey.find({company:companyId}).populate('stores').exec().catch(err=>{
        console.log(err)
    })   
    return surveys
}

async function details(surveyId){
    let survey = await Survey.findById(surveyId).populate('questions stores company').exec().catch(err=>{
        console.log(err)
    })   
    return survey
}

async function destroy(surveyId){
    await Survey.findByIdAndDelete(surveyId)
    .exec()
    .catch(err=>console.log(err))
    return true
}

module.exports={
    create,
    update,
    index,
    destroy,
    details
}