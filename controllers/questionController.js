const Question = require('../models/Question')

async function create(data){
    let newQuestion = new Question({
        name:data.name,
        description:data.description,
    })
    await newQuestion.save()
    return newQuestion
}

async function update(id,data){
    let newQuestion= await Question.findByIdAndUpdate(id,{$set:data},{new:true}).exec().catch(err=>{
        console.log(err)
    })   
    return newQuestion
}

async function details(id){
    let newQuestion= await Question.findById(id).exec().catch(err=>{
        console.log(err)
    })   
    return newQuestion
}

async function index(query){
    let Questions = await Question.find(query).exec().catch(err=>{
        console.log(err)
    })   
    return Questions
}

async function destroy(questionId){
    await Question.findByIdAndDelete(questionId)
    .exec()
    .catch(err=>console.log(err))
    return true
}

module.exports={
    create,
    update,
    index,
    details,
    destroy   
}