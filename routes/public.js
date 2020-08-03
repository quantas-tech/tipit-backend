const express = require('express')
const router = express.Router()
const surveyController = require('../controllers/surveyController')
const resultController = require('../controllers/resultController')
const axios = require('axios')

router.get('/:surveyId',async function(req, res){   
    const survey = await surveyController.details(req.params.surveyId)
    if(survey){
        survey.company.admins.splice(0,1)
        res.send(survey)
    }else{
        res.sendStatus(404)
    }
})

router.post('/:surveyId',async function(req,res){
    const secret_key = process.env.GOOGLE_RECAPTCHA
    const token = req.body.token
    const url = 
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`

    axios.post(url).then(response=>{
        if(response.data.success &&
             response.data.action =='store' &&
             response.data.score >= 0.5){

                resultController.create(req.body).then(()=>{
                    res.sendStatus(200)
                }).catch(err=>console.log(err))
                
        }else{
            res.sendStatus(500)
        }
    }).catch(err=>console.log(err))
})

module.exports = router
