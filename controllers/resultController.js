const Result = require('../models/result')

async function create(data){
    let newResult = new Result({
        survey:data.survey,
        answers:data.answers
    })
    await newResult.save()
    return newResult
}
module.exports={
    create
}