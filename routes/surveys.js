const express = require('express')
const router = express.Router()
const surveyController = require('../controllers/surveyController')

router.get('/:companyId', async function(req,res){
    let surveys = await surveyController.index(req.params.companyId)
    res.send(surveys)
})
router.get('/:companyId/:id', async function(req,res){
    let survey = await surveyController.details(req.params.id)
    res.send(survey)
})
router.post('/:companyId', async function(req,res){
    let newSurvey = await surveyController.create(req.params.companyId, req.body)
    res.send(newSurvey)
})
router.patch('/:id', async function(req,res){
    let newSurvey = await surveyController.update(req.params.id, req.body)
    res.send(newSurvey)
})
router.delete('/:id', async function(req,res){
    let ok = await surveyController.destroy(req.params.id)
    res.send(ok)
})

module.exports = router